import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { ParsedQs } from 'qs'
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
import { ParsedQs } from 'qs'
>>>>>>> reset-password/getme

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
<<<<<<< HEAD
=======
=======
>>>>>>> reset-password/getme

export interface EmailVerifyReqQuery extends ParsedQs {
  email_verify_token: string
}

export interface ForgotPasswordReqBody {
  email: string
}
<<<<<<< HEAD
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======

export interface VerifyForgotPasswordTokenReqBody {
  forgot_password_token: string
}

export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string //be careful
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional
}
>>>>>>> reset-password/getme
