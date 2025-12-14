import User from '~/models/User.schema'
import databaseServices from './database.services'
import { LoginReqBody, RegisterReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { StringValue } from 'ms'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import RefreshToken from '~/models/RefreshToken.schema'
import { ObjectId } from 'mongodb'

class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken }, //0
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string //thêm
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken }, //0
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string //thêm
    })
  }

  async register(payload: RegisterReqBody) {
    //muốn đăng kí tài khoản gửi cho 1 object như này
    // const { email, password } = payload
    const result = await databaseServices.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth), //ghi đè
        password: hashPassword(payload.password) //ghi đè lại password bằng password đã đc mã hóa
      })
    )
    //lấy id của user vừa tạo để làm ac và rf
    const user_id = result.insertedId.toString()
    //ký ac và rf
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //thiếu việc lưu rf vào database
    await databaseServices.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //
    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }

  async login(payload: LoginReqBody) {
    //tìm user bằng các email và password đã mã hóa
    const user = await databaseServices.users.findOne({
      ...payload, //
      password: hashPassword(payload.password)
    })
    //nếu ko có thì báo lỗi
    if (!user) {
      throw new ErrorWithStatus({
        //phải vô database tìm
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT
      })
    }
    //nếu có thì tạo ac và rf từ user_id của user tìm đc
    const user_id = user._id.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
    //lưu trữ
    await databaseServices.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //

    return {
      access_token,
      refresh_token
    }
  }
  async checkRefreshToken({ user_id, refresh_token }: { user_id: string; refresh_token: string }) {
    const refreshToken = await databaseServices.refreshTokens.findOne({
      user_id: new ObjectId(user_id),
      token: refresh_token
    })
    //nếu k có thì báo lỗi
    if (!refreshToken) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
      })
    }
    //nếu có thì thôi
  }

  async logout(refresh_token: string) {
    await databaseServices.refreshTokens.deleteOne({ token: refresh_token })
  }
}

const usersServices = new UsersServices()
export default usersServices //tại sao mà mình export nó ra là vì nó cùng tên với class
//đc quyền tác động vào database service
