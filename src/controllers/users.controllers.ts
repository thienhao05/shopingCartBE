<<<<<<< HEAD
import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  //call service de lay du lieu tu database kiem tra
  const { email, password } = req.body
  if (email != 'lehodiep1999@gmail.com' || password != 'weArePiedTeam') {
    return res.status(401).json({
      message: 'Unauthenticated'
    })
  }
  // dong goi response
  return res.status(200).json({
    message: 'Login successfull'
=======
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayLoad } from '~/models/request/User.requests'
import { ParamsDictionary } from 'express-serve-static-core'
import usersServices from '~/services/users.services'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>, //
  res: Response
) => {
  // throw new Error('ahihi')
  //code mà vào đc đây tức là dữ liệu truyền lên ngon
  //body có email và password ngon, chỉ cần kiểm tra đúng không thôi
  const result = await usersServices.login(req.body)
  //gửi result cho client
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result //ac và rf để nó truy cập
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>, //
  res: Response,
  next: NextFunction
) => {
  //nếu như có phát sinh lỗi
  // const { email, password } = req.body

  //kiểm tra tính đúng của dữ  liệu có liên quan đến database
  //  ***ở controller dữ liệu đã sạch và đủ***
  //  - kiểm tra xem email này đã có người sử dụng chưa ?
  const isExisted = await usersServices.checkEmailExist(req.body.email)
  if (isExisted) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY, //422
      message: USERS_MESSAGES.EMAIL_ALREADY_EXISTS
    })
  } //tự đóng lỗi try if xuống catch luôn
  /*
    trong error có 1 bộ cờ có tính chất nguy hiểm, state, name, message, thì có thuộc tính error có enumerable: false và k hiển thị đc
    */

  //  - tạo user mới trên database
  const result = await usersServices.register(req.body) //mình bên trong nó có cái gì
  //response đóng gói kết quả
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>, //
  res: Response
) => {
  const { user_id: user_id_ac } = req.decoded_authorization as TokenPayLoad
  const { user_id: user_id_rf } = req.decoded_refresh_token as TokenPayLoad
  if (user_id_ac !== user_id_rf) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGES.REFRESH_TOKEN_IS_INVALID
    })
  }
  const { refresh_token } = req.body
  //kiểm tra xem rf còn trên hệ thống không ?
  await usersServices.checkRefreshToken({
    user_id: user_id_rf,
    refresh_token
  })
  //nếu còn bth mình xóa
  await usersServices.logout(refresh_token) //xóa rf token khỏi hệ thống

  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
>>>>>>> users/logout
  })
}
