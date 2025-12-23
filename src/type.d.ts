import { TokenPayLoad } from './models/request/User.requests'
import { Request } from 'express' //mình tự import vô nha, nguy hiểm
declare module 'express' {
  interface Request {
    decoded_authorization?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    decoded_email_verify_token?: TokenPayLoad
    decoded_forgot_password_token?: TokenPayLoad
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
    decoded_email_verify_token?: TokenPayLoad
    decoded_forgot_password_token?: TokenPayLoad
>>>>>>> reset-password/getme
=======
    decoded_email_verify_token?: TokenPayLoad
    decoded_forgot_password_token?: TokenPayLoad
>>>>>>> uploadfile-refresh_token
  }
}
