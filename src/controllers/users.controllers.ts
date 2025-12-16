<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> fixJwtTokenStrong
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { LoginReqBody, LogoutReqBody, RegisterReqBody, TokenPayLoad } from '~/models/request/User.requests'
=======
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
  EmailVerifyReqQuery,
  ForgotPasswordReqBody,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  TokenPayLoad
} from '~/models/request/User.requests'
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
import { ParamsDictionary } from 'express-serve-static-core'
import usersServices from '~/services/users.services'
import { ErrorWithStatus } from '~/models/Errors'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
<<<<<<< HEAD
=======
import { UserVerifyStatus } from '~/constants/enums'
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword

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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======
  })
}

export const emailVerifyController = async (
  req: Request<ParamsDictionary, any, any, EmailVerifyReqQuery>, //
  res: Response
) => {
  const { email_verify_token } = req.query
  const { user_id } = req.decoded_email_verify_token as TokenPayLoad
  //kiểm tra email_verify_token có thật sự thuộc sở hữu của user đó không ?
  await usersServices.checkEmailVerifyToken({
    user_id,
    email_verify_token
  }) //nếu có lỗi thì hàm trên sẽ ném lỗi, còn k thì thôi
  //verify email: xóa email_verify_token và đổi verify: từ 0 thành 1
  await usersServices.verifyEmail(user_id)
  //gửi response
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.EMAIL_VERIFY_SUCCESS
  })
}

export const resendVerifyEmailController = async (req: Request, res: Response) => {
  //0. lấy user_id từ decoded_access_token vì mình có verify access_token trước đó ở
  //    middleware rồi
  const { user_id } = req.decoded_authorization as TokenPayLoad
  //1. Tìm thông tin user xem trạng thái verify của nó thế nào
  const verifyStatus = await usersServices.getVerifyStatus(user_id)
  //nếu đã verify th2i thông báo là không cần gửi lại
  if (verifyStatus == UserVerifyStatus.Verified) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
    })
  }
  //nếu bị banned thì không gửi
  if (verifyStatus == UserVerifyStatus.Banned) {
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.ACCOUNT_HAS_BEEN_BANNED
    })
  }
  //nếu chưa verify thì gửi lại
  if (verifyStatus == UserVerifyStatus.Unverified) {
    //resendVerifyEmail: tạo email_verify_token mối, cập nhật lại user và gửi email
    await usersServices.resendVerifyEmail(user_id)
    return res.status(HTTP_STATUS.OK).json({
      message: USERS_MESSAGES.RESEND_VERIFY_EMAIL_SUCCESS
    })
  }
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>, //
  res: Response
) => {
  //dựa vào email kiểm tra xem user này có tồn tại không
  //email này có tồn tại trong hệ thống không ?
  const { email } = req.body
  const isExisted = await usersServices.checkEmailExist(email)
  if (!isExisted) {
    //nhớ có ! nha "Nếu email k tồn tại thì sao mà lấy lại mật khẩu"
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED, //401
      message: USERS_MESSAGES.USER_NOT_FOUND
    })
  }
  //nếu có tồn tại thì mình sẽ tạo forgot_password_token và lưu vào user
  //đồng thời gửi link forgot_password_token cho người dùng qua email
  await usersServices.forgotPassword(email)
  return res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGES.CHECK_YOUR_EMAIL
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
  })
}
