import { NextFunction, Request, RequestHandler, Response } from 'express'
// wrapperAsync biến những hàm Async
// thành hàm có cấu trúc try catch + next
//RequestHandler: (req, res, next) => {}
//generic
export const wrapAsync = <P, T>(func: RequestHandler<P, any, any, T>) => {
  return async (req: Request<P, any, any, T>, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
