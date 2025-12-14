import express from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handler'

const usersRoutes = express.Router()

usersRoutes.post('/login', loginValidator, loginController)

usersRoutes.post(
  '/register',
  registerValidator, //
  wrapAsync(registerController)
)

export default usersRoutes
