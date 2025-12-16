import { NextFunction, Request, RequestHandler, Response } from 'express'
// wrapperAsync biến những hàm Async
// thành hàm có cấu trúc try catch + next
//RequestHandler: (req, res, next) => {}
<<<<<<< HEAD
export const wrapAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
=======
//generic
export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
