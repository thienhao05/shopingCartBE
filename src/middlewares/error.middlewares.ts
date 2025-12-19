import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (
  err: any, //
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //lỗi errr có thể là bất cứ dạng lỗi nào, mình k lường trc đc
  //nếu là lỗi do mình chủ đích tạo ra thì nó là ErrorWithStatus và
  //có status
  //nếu
  if (err instanceof ErrorWithStatus) {
    return res
      .status(err.status) //
      .json(omit(err, ['status']))
  }

  //nếu là lỗi khác thì phải đưa các property về enumberable true
  //error thì nó tàn hình rồi ko dùng forIn đc phải dùng forEach đi qua từng thằng của nó

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR) //
    .json(omit(err, ['stack']))
  //trong quá trình mình code thì mình để chỗ này err, ra sản phẩm mới giấu omit đi
}
