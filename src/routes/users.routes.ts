import express from 'express'
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'
const usersRoutes = express.Router()

/*
path: users/login
method: POST
Request: headers(gửi những cái mật khẩu mà server cho mình) 
         body(những mật khẩu của mình muốn gửi lên server)
         param(méo quan trọng)
         query(méo quan trọng)
    headers: do server gui cho minh minh gui lai(người ta cho mình cái mật khẩu cái mình giữ mình gửi lên lại)
    body: minh gui len server (cái gì của mình, mình gửi lên server)
body: {
    email: string,
    password: string
}
loginValidator: kiem tra email va password (middleware)
loginController: dong goi kien va gui ket qua
*/

usersRoutes.post('/login', loginValidator, wrapAsync(loginController))

/* register
path: users/register
method: post
body:{
    email: string,
    name: string,
    password: string,
    confirm_password: string,
    date_of_birth: ISO8601
}

registerValidator.notEmpty().isString()
là mình chấm hoài luôn học để biết thôi
*/

usersRoutes.post(
  '/register',
  registerValidator, //
  wrapAsync(registerController)
)

/*Logout: 
path: /users/logout
method: post
headers{
    Authorization: 'Bearer access_token'
}
body: {
    refresh_token: string,
}

access_token: string ko gửi access qua body mà nó phải gửi vào trong headers để định danh trước
*/
usersRoutes.post(
  '/logout', //
  accessTokenValidator,
  refreshTokenValidator,
  wrapAsync(logoutController)
)

/*verify-email
des: người dùng vào email để bấm vào link xác thực, link này thật chất
là gửi lại email_verify_toke lên server để server xác thực
path: /users/verify-email/?email_verify_token=string
method: GET (vì người dùng chỉ bấm vào link)
query:{
  email_verify_token: string
}
*/

usersRoutes.get(
  '/verify-email/', //
  emailVerifyTokenValidator,
  wrapAsync(emailVerifyController)
)

/*resend-verify-email
des: người dùng muốn verify-email nhưng chưa | không có link 
path: /users/resend-verify-email
method: POST (cần biết người dùng là ai để gửi mail của người dùng đó)
headers{
  Authorization: 'Bearer access_token'
}

*/

usersRoutes.post(
  '/resend-verify-email',
  accessTokenValidator, //hàm làm rồi không làm nữa
  wrapAsync(resendVerifyEmailController)
)

/*forgot-password
path: /users/forgot-password
method: POST
body: {
  email: string
}
 */
usersRoutes.post(
  '/forgot-password', //,
  forgotPasswordValidator, //kiểm tra email trong body
  wrapAsync(forgotPasswordController)
)

export default usersRoutes
