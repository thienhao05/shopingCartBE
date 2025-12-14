import { NextFunction, Request, Response } from 'express'
import usersServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/request/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email != 'lehodiep.1999@gmail.com' || password != 'weArePiedTeam') {
    return res.status(401).json({
      message: 'Unauthenticated'
    })
  }
  // dong goi response
  return res.status(200).json({
    message: 'Login successfull'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>, //
  res: Response,
  next: NextFunction
) => {
  const isExisted = await usersServices.checkEmailExist(req.body.email)
  if (isExisted) {
    const errorCustom = new Error('Email has been used')
    Object.defineProperty(errorCustom, 'message', {
      enumerable: true
    })
    throw errorCustom
  }
  //  - tạo user mới trên database
  const result = await usersServices.register(req.body)
  //response đóng gói kết quả
  return res.status(200).json({
    message: 'register success',
    result
  })
}
