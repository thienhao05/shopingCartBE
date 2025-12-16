import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'
<<<<<<< HEAD
=======
import { ParsedQs } from 'qs'
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword

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
<<<<<<< HEAD
=======

export interface EmailVerifyReqQuery extends ParsedQs {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
