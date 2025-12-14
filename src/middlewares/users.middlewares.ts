import { NextFunction, Request, Response } from 'express'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    //400: bad request
    return res.status(400).json({
      message: 'Email or Password is missing'
    })
  }
  next()
}
