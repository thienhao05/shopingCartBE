import express from 'express'
import { loginController } from '~/controllers/users.controllers'
import { loginValidator } from '~/middlewares/users.middlewares'
const usersRoutes = express.Router()

/*
path: users/login
method: POST
Request: headers body param query
    headers: do server gui cho minh minh gui lai
    body: minh gui len server
body: {
    email: string,
    password: string
}
loginValidator: kiem tra email va password
loginController: dong goi kien va gui ket qua
*/

usersRoutes.post('/login', loginValidator, loginController)

export default usersRoutes
