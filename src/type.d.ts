import { TokenPayLoad } from './models/request/User.requests'
import { Request } from 'express' //mình tự import vô nha, nguy hiểm
declare module 'express' {
  interface Request {
    decoded_authorization?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
  }
}
