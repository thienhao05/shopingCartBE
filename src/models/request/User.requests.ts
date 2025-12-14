import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

//định nghĩa những gì người dùng sẽ gửi lên
export interface RegisterReqBody {
  email: string
  name: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LoginReqBody {
  email: string
  password: string
}

export interface LogoutReqBody {
  refresh_token: string
}

export interface TokenPayLoad extends JwtPayload {
  user_id: string
  token_type: TokenType
}
