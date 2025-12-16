import { NextFunction, Request, Response } from 'express'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

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
=======
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
import { checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { TokenPayLoad } from '~/models/request/User.requests'
>>>>>>> fixJwtTokenStrong
=======
import { TokenPayLoad } from '~/models/request/User.requests'
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
import { verifyToken } from '~/utils/jwt'
import { validate } from '~/utils/validation'

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: false
            // false : chỉ return true nếu password mạnh, false nếu k
            // true : return về chất lượng password(trên thang điểm 10)
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

//RegisterValidator
export const registerValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100
        }
      },
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      },
      password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
            // returnScore: false
            // false : chỉ return true nếu password mạnh, false nếu k
            // true : return về chất lượng password(trên thang điểm 10)
          },
          errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 8,
            max: 50
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(USERS_MESSAGES.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_BE_ISO8601
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  //
  checkSchema(
    {
      Authorization: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        trim: true, //thêm
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
        notEmpty: {
          errorMessage: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            //value là Authorization: 'Bearer access_token'
            //xử lý value để lấy ra đc cái access
            const access_token = value.split(' ')[1]
            //nếu k có thì
            if (!access_token) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401 ám chỉ mày tấn công tao
                message: USERS_MESSAGES.ACCESS_TOKEN_IS_REQUIRED
              })
            }
            //nếu có access_token
            try {
<<<<<<< HEAD
<<<<<<< HEAD
              const decoded_authorization = await verifyToken({ token: access_token }) //nó là 1 Promise nó chỉ là cái payload thôi
=======
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
              //const decoded_authorization = await verifyToken({ token: access_token }) //nó là 1 Promise nó chỉ là cái payload thôi
              const decoded_authorization = (await verifyToken({
                token: access_token,
                privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
              })) as TokenPayLoad

<<<<<<< HEAD
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
              ;(req as Request).decoded_authorization = decoded_authorization
              //cất lỗi qua tầng sau xài
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
                //capitalize của lodash, error lỗi này thì trong jwt viết thường
              })
            }
            return true //passed validation
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  //
  checkSchema(
    {
      refresh_token: {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        trim: true, //thêm
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
        notEmpty: {
          errorMessage: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value, { req }) => {
            //value là refresh_token
            if (!value) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401 ám chỉ mày tấn công tao
                message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED
              })
            }
            //nếu có refresh_token thì
            try {
<<<<<<< HEAD
<<<<<<< HEAD
              const decoded_refresh_token = await verifyToken({ token: value }) //nó là 1 Promise nó chỉ là cái payload thôi
=======
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
              //const decoded_refresh_token = await verifyToken({ token: value }) //nó là 1 Promise nó chỉ là cái payload thôi
              const decoded_refresh_token = (await verifyToken({
                token: value,
                privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string
              })) as TokenPayLoad
<<<<<<< HEAD
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
              ;(req as Request).decoded_refresh_token = decoded_refresh_token
              //cất lỗi qua tầng sau xài
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
                //capitalize của lodash, error lỗi này thì trong jwt viết thường
              })
            }
            return true //passed validation
          }
        }
      }
    },
    ['body']
  )
)
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======

export const emailVerifyTokenValidator = validate(
  checkSchema(
    {
      email_verify_token: {
        trim: true,
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_VERIFY_TOKEN_IS_REQUIRED
        },
        //nếu có thì mình phải verify: và k có hàm sẵn
        custom: {
          options: async (value, { req }) => {
            //trong đó value là email_verify_token mà  mình cần kiểm tra
            try {
              const decoded_email_verify_token = await verifyToken({
                token: value,
                privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string
              })
              ;(req as Request).decoded_email_verify_token = decoded_email_verify_token
            } catch (error) {
              throw new ErrorWithStatus({
                status: HTTP_STATUS.UNAUTHORIZED, //401
                message: capitalize((error as JsonWebTokenError).message)
              })
            }
            //
            return true //passed validator
          }
        }
      }
    },
    ['query']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      //email
      email: {
        notEmpty: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true
      }
    },
    ['body']
  )
)
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
