import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginReqBody, RegisterReqBody } from '~/models/request/User.requests'
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
