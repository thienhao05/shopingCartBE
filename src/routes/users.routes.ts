import express from 'express'
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
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
const usersRoutes = express.Router()

/*
path: users/login
method: POST
<<<<<<< HEAD
<<<<<<< HEAD
Request: headers body param query
    headers: do server gui cho minh minh gui lai
    body: minh gui len server
=======
=======
>>>>>>> fixJwtTokenStrong
Request: headers(gửi những cái mật khẩu mà server cho mình) 
         body(những mật khẩu của mình muốn gửi lên server)
         param(méo quan trọng)
         query(méo quan trọng)
    headers: do server gui cho minh minh gui lai(người ta cho mình cái mật khẩu cái mình giữ mình gửi lên lại)
    body: minh gui len server (cái gì của mình, mình gửi lên server)
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
body: {
    email: string,
    password: string
}
<<<<<<< HEAD
<<<<<<< HEAD
loginValidator: kiem tra email va password
loginController: dong goi kien va gui ket qua
*/

usersRoutes.post('/login', loginValidator, loginController)
=======
=======
>>>>>>> fixJwtTokenStrong
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
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong

export default usersRoutes
