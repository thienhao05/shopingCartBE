import jwt from 'jsonwebtoken'
import { TokenPayLoad } from '~/models/request/User.requests'
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET,
  options = { algorithm: 'HS256' }
}: {
  payload: any //
  privateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey as string, options, function (err, token) {
      if (err) throw reject(err)
      else resolve(token as string)
    })
  })
}

// jwt.sign() cách tìm kiểu dữ liệu

export const verifyToken = ({
  token, //
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string
  privateKey?: string
}) => {
  //decoded chính là cái payload của mình nha
  //decoded chính là cái payload của mình đc mã hóa
  return new Promise<TokenPayLoad>((resolve, reject) => {
    jwt.verify(token, privateKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayLoad)
    })
  })
}
