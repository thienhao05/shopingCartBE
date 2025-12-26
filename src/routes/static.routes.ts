import express from 'express'
import { serveImageController, serveVideoController } from '~/controllers/medias.controllers'
import { wrapAsync } from '~/utils/handler'

const staticRoutes = express.Router()

//route chia sẻ ảnh
staticRoutes.get(
  '/image/:filename', //param nó ko có tên biến sau image th2i mặc định là gái trị đ1o truyền trực tiếp như vậy luôn
  wrapAsync(serveImageController)
)
staticRoutes.get(
  '/video/:filename', //param nó ko có tên biến sau image th2i mặc định là gái trị đ1o truyền trực tiếp như vậy luôn
  wrapAsync(serveVideoController)
)

export default staticRoutes
//lc:3000/users/verify-email-token/?verify_emai_token=adfasdfasd
