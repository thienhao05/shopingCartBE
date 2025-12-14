import { NextFunction, Request, RequestHandler, Response } from 'express'
// wrapperAsync biến những hàm Async
// thành hàm có cấu trúc try catch + next
//RequestHandler: (req, res, next) => {}
export const wrapAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
