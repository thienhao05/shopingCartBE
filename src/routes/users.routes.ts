import express from 'express'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
=======
=======
>>>>>>> fixJwtTokenStrong
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
=======
import {
  emailVerifyController,
  forgotPasswordController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController
=======
import {
=======
import {
  changePasswordController,
>>>>>>> uploadfile-refresh_token
  emailVerifyController,
  forgotPasswordController,
  getMeController,
  loginController,
  logoutController,
<<<<<<< HEAD
=======
  refreshTokenController,
>>>>>>> uploadfile-refresh_token
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  updateMeController,
  verifyForgotPasswordController
<<<<<<< HEAD
>>>>>>> reset-password/getme
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
<<<<<<< HEAD
  forgotPasswordValidator,
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
=======
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
>>>>>>> uploadfile-refresh_token
  forgotPasswordTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  updateMeValidator
} from '~/middlewares/users.middlewares'
<<<<<<< HEAD
import { wrapAsync } from '~/utils/handler'
>>>>>>> reset-password/getme
=======
import { ChangePasswordReqBody, UpdateMeReqBody } from '~/models/request/User.requests'
import { wrapAsync } from '~/utils/handler'
>>>>>>> uploadfile-refresh_token
const usersRoutes = express.Router()

/*
path: users/login
method: POST
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
Request: headers body param query
    headers: do server gui cho minh minh gui lai
    body: minh gui len server
=======
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
Request: headers(gửi những cái mật khẩu mà server cho mình) 
         body(những mật khẩu của mình muốn gửi lên server)
         param(méo quan trọng)
         query(méo quan trọng)
    headers: do server gui cho minh minh gui lai(người ta cho mình cái mật khẩu cái mình giữ mình gửi lên lại)
    body: minh gui len server (cái gì của mình, mình gửi lên server)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
body: {
    email: string,
    password: string
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
loginValidator: kiem tra email va password
loginController: dong goi kien va gui ket qua
*/

usersRoutes.post('/login', loginValidator, loginController)
=======
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======
=======
>>>>>>> reset-password/getme

/*verify-email
des: người dùng vào email để bấm vào link xác thực, link này thật chất
là gửi lại email_verify_toke lên server để server xác thực
=======

/*verify-email
des: người dùng vào email để bấm vào link xác thực, link này thật chất
là gửi lại email_verify_token lên server để server xác thực
>>>>>>> uploadfile-refresh_token
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
=======
>>>>>>> uploadfile-refresh_token

/*verify-forgot-password
des: khi người dùng vào mail click vào link để verify, họ sẽ gửi 
forgot_password_token cho frontend, frontend sẽ gửi token này lên server để verify
nếu oke thì hiển thị form nhập mật khẩu mới
path: /users/verify-forgot-password
method: POST
body: {
  forgot_password_token: string
}
*/
usersRoutes.post(
  '/verify-forgot-password', //
  forgotPasswordTokenValidator, //kiểm tra forgot_password_token trong body
  wrapAsync(verifyForgotPasswordController)
)

/*reset-password
des: frontend sẽ gửi password và confirm_password, kèm với forgot_password_token
lên cho backend tiến hành xác thực và đổi mật khẩu
path: /users/reset-password
method: POST
body:{
  password: string,
  confirm_password: string,
  forgot_password_token: string
}
*/

usersRoutes.post(
  '/reset-password', //
  forgotPasswordTokenValidator, //hàm kiểm tra mã
  resetPasswordValidator, //kiểm tra password và confirm_password mới
  wrapAsync(resetPasswordController)
)
//cách test nè, test theo thứ tự nha
//login | forgot-password | reset-password | login

/*getMe
des: lấy thông tin của chính mình, của user đang đăng nhập
path: /users/me
method: POST
header: {
  Authorization: 'Bearer access_token'
}
*/
usersRoutes.post(
  '/me',
  accessTokenValidator, //
  wrapAsync(getMeController)
)

<<<<<<< HEAD
/*
=======
/*updateMe
>>>>>>> uploadfile-refresh_token
des: update profile của user
path: '/me'
method: patch
Header: {Authorization: Bearer <access_token>}
body: {
  name?: string
  date_of_birth?: Date
  bio?: string // optional
  location?: string // optional
  website?: string // optional
  username?: string // optional
  avatar?: string // optional
  cover_photo?: string // optional}
*/

usersRoutes.patch(
  '/me', //
  accessTokenValidator,
  updateMeValidator,
<<<<<<< HEAD
  wrapAsync(updateMeController)
)
//test lại nha
>>>>>>> reset-password/getme
=======
  filterMiddleware<UpdateMeReqBody>([
    'avatar',
    'bio',
    'cover_photo',
    'date_of_birth',
    'location',
    'name',
    'username',
    'website'
  ]),
  wrapAsync(updateMeController)
)
//test lại nha

/*change-password
des: khi người dùng đã 'đăng nhập' muốn đổi mật khẩu
path: /users/change-password
method: PUT
headers{
  Authorization: 'Bearer access_token'
}
body: {
  old_password: string,
  password: string,
  confirm_password: string
}
*/

usersRoutes.put(
  '/change-password', //
  accessTokenValidator, //có rồi không làm nữa
  changePasswordValidator, //kiểm tra old_password, password, confirm_password
  // filterMiddleware<ChangePasswordReqBody>([]),
  wrapAsync(changePasswordController)
)

/*RefreshToken
des: khi mã acess_token hết hạn thì client sẽ gửi refresh_token lên để xin 
access_token và refresh_token mới
path: 'users/refresh-token'
method: POST
body: {
  refresh_token: string
}
*/

usersRoutes.post(
  '/refresh-token', //
  refreshTokenValidator, //mình đã làm hàm verify refresh_token gòi
  wrapAsync(refreshTokenController)
)
>>>>>>> uploadfile-refresh_token

export default usersRoutes
