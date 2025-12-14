import User from '~/models/User.schema'
import databaseServices from './database.services'
import { RegisterReqBody } from '~/models/request/User.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import { StringValue } from 'ms'

class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken }, //0
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken }, //0
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN as StringValue }
    })
  }

  async register(payload: RegisterReqBody) {
    //muốn đăng kí tài khoản gửi cho 1 object như này
    const { email, password } = payload
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

    return {
      access_token,
      refresh_token
    }
  }

  async checkEmailExist(email: string): Promise<boolean> {
    const user = await databaseServices.users.findOne({ email })
    return Boolean(user)
  }
}

const usersServices = new UsersServices()
export default usersServices
