import User from '~/models/User.schema'
import databaseServices from './database.services'
import { LoginReqBody, RegisterReqBody, UpdateMeReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { StringValue } from 'ms'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import RefreshToken from '~/models/RefreshToken.schema'
import { ObjectId } from 'mongodb'

class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string, //thêm
      payload: { user_id, token_type: TokenType.AccessToken }, //0
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string, //thêm
      payload: { user_id, token_type: TokenType.RefreshToken }, //1
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signEmailVerifyToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string, //thêm
      payload: { user_id, token_type: TokenType.EmailVerificationToken }, //1
      options: { expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signForgotPasswordToken(user_id: string) {
    return signToken({
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string, //thêm
      payload: { user_id, token_type: TokenType.ForgotPasswordToken }, //1
      options: { expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  async register(payload: RegisterReqBody) {
    //muốn đăng kí tài khoản gửi cho 1 object như này
    // const { email, password } = payload
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    const result = await databaseServices.users.insertOne(
      new User({
        _id: user_id,
        email_verify_token,
        ...payload,
        date_of_birth: new Date(payload.date_of_birth), //ghi đè
        password: hashPassword(payload.password) //ghi đè lại password bằng password đã đc mã hóa
      })
    )

    //ký ac và rf
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id.toString()),
      this.signRefreshToken(user_id.toString())
    ])
    //thiếu việc lưu rf vào database
    await databaseServices.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    //
    //email_verify_token thì phải gửi qua email
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)

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

  async checkEmailVerifyToken({
    user_id, //
    email_verify_token
  }: {
    user_id: string
    email_verify_token: string
  }) {
    //tìm user sở hữu 2 thông tin này cùng lúc: kiểm tra xem user có đang sở hữu cái evt này k
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id), //mongo lưu là _id
      email_verify_token
    })
    //nếu k tìm thấy user thì nghĩa là evt  k hợp lệ
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
        message: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_INVALID
      })
    }
    //nếu có thì thôi
  }

  async verifyEmail(user_id: string) {
    //cập nhật lại user
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            email_verify_token: '', //
            updated_at: '$$NOW',
            verify: UserVerifyStatus.Verified
          }
        }
      ]
    )
  }

  async getVerifyStatus(user_id: string) {
    //tìm user thông qua user_id
    const user = await databaseServices.users.findOne({ _id: new ObjectId(user_id) })
    //nếu k có thì ném lỗi
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, //401
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //nếu có thì
    return user.verify //chỉ return trạng thái verify, k đc return user ra controller
    //nếu không thì bị lộ rất nhiều thông tin nhạy cảm
  }

  async resendVerifyEmail(user_id: string) {
    //tạo email_verify_token mới
    const email_verify_token = await this.signEmailVerifyToken(user_id)
    //cập nhật lại user với email_verify_token mới
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            email_verify_token, //
            updated_at: '$$NOW'
          }
        }
      ]
    )
    //gửi email(tao lấy console từ cái register ở trên)
    console.log(`http://localhost:3000/users/verify-email/?email_verify_token=${email_verify_token}`)
  }

  //forgotPassword
  async forgotPassword(email: string) {
    //tìm user thông qua email để lấy id để kí
    const user = await databaseServices.users.findOne({ email })
    //
    const user_id = user!._id.toString()
    //tạo forgot_password_token từ user_id
    const forgot_password_token = await this.signForgotPasswordToken(user_id)
    //cập nhật lại user với forgot_password_token mới
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //
      [
        {
          $set: {
            forgot_password_token, //
            updated_at: '$$NOW'
          }
        }
      ]
    )
    //tạo link
    console.log(`http://localhost:8000/users/reset-password/?forgot_password_token=${forgot_password_token}`)
  }

  async checkForgotPasswordToken({
    user_id, //
    forgot_password_token
  }: {
    user_id: string
    forgot_password_token: string
  }) {
    //dựa vào 2 thôn tin trên tìm user nếu k có nghĩa là mã forgot_password_toke
    //k hợp lệ, k còn trong hệ thống nữa
    const user = await databaseServices.users.findOne({
      _id: new ObjectId(user_id),
      forgot_password_token
    })
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.UNAUTHORIZED, //401
        message: USERS_MESSAGES.FORGOT_PASSWORD_TOKEN_IS_INVALID
      })
    }
    //còn có thì thôi, k nói gì cả
  }

  async resetPassword({ user_id, password }: { user_id: string; password: string }) {
    //tìm và cập nhật lại password
    await databaseServices.users.updateOne(
      { _id: new ObjectId(user_id) }, //filter
      [
        {
          $set: {
            forgot_password_token: '',
            password: hashPassword(password),
            updated_at: '$$NOW'
          }
        }
      ]
    )
  }

  async getMe(user_id: string) {
    const user = await databaseServices.users.findOne(
      {
        _id: new ObjectId(user_id)
      }, //
      {
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    //
    if (!user) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: USERS_MESSAGES.USER_NOT_FOUND
      })
    }
    //
    return user
  }

  async updateMe({ user_id, payload }: { user_id: string; payload: UpdateMeReqBody }) {
    //payload có 2 thứ cần fix là date_of_birth và username
    const _payload = payload.date_of_birth //
      ? { ...payload, date_of_birth: new Date(payload.date_of_birth) }
      : payload
    //nếu có muốn cập nhật username
    if (_payload.username) {
      const user = await databaseServices.users.findOne({ username: _payload.username })
      //nếu có người dùng cái username rồi thì báo lỗi
      if (user) {
        throw new ErrorWithStatus({
          status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
          message: USERS_MESSAGES.USERNAME_ALREADY_EXISTS
        })
      }
    }
    //tiến hành cập nhật
    const userInfor = await databaseServices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) }, //filter
      [
        {
          $set: {
            ...payload,
            updated_at: '$$NOW'
          }
        }
      ],
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return userInfor
  }
}

const usersServices = new UsersServices()
export default usersServices //tại sao mà mình export nó ra là vì nó cùng tên với class
//đc quyền tác động vào database service
