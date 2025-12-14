import { Request, Response } from 'express'

export const loginController = (req: Request, res: Response) => {
  //call service de lay du lieu tu database kiem tra
  const { email, password } = req.body
  if (email != 'lehodiep1999@gmail.com' || password != 'weArePiedTeam') {
    return res.status(401).json({
      message: 'Unauthenticated'
    })
  }
  // dong goi response nha oke
  return res.status(200).json({
    message: 'Login successfull'
  })
}
