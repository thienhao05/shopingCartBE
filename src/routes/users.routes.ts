import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
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

export default usersRoutes
