import jwt from 'jsonwebtoken'
import { TokenPayLoad } from '~/models/request/User.requests'
export const signToken = ({
  payload,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  privateKey = process.env.JWT_SECRET,
  options = { algorithm: 'HS256' }
}: {
  payload: any //
  privateKey?: string
=======
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
  // privateKey = process.env.JWT_SECRET,
  privateKey,
  options = { algorithm: 'HS256' }
}: {
  payload: object | string | Buffer //
  privateKey: string // bỏ ? để ép truyền vào
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  privateKey = process.env.JWT_SECRET as string
}: {
  token: string
  privateKey?: string
=======
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
  // privateKey = process.env.JWT_SECRET as string
  privateKey
}: {
  token: string
  privateKey: string //bỏ ? để ép truyền vào
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
=======
>>>>>>> uploadfile-refresh_token
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
