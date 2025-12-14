import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Errors'
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

// export const registerValidator = validate(
//   checkSchema(
//     {
//       name: {
//         notEmpty: true,
//         isString: true,
//         trim: true,
//         isLength: {
//           options: {
//             min: 1,
//             max: 100
//           }
//           //error chửi đặt đúng chỗ, chửi đúng nơi
//         }
//       },
//       email: {
//         notEmpty: true,
//         isEmail: true,
//         trim: true
//       },
//       password: {
//         notEmpty: true,
//         isString: true,
//         isLength: {
//           options: {
//             min: 8,
//             max: 50
//           }
//         },
//         isStrongPassword: {
//           options: {
//             minLength: 8,
//             minLowercase: 1,
//             minUppercase: 1,
//             minNumbers: 1,
//             minSymbols: 1
//             // returnScore: false
//             // false : chỉ return true nếu password mạnh, false nếu k
//             // true : return về chất lượng password(trên thang điểm 10)
//           }
//         },
//         errorMessage:
//           'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//       },
//       confirm_password: {
//         notEmpty: true,
//         isString: true,
//         isLength: {
//           options: {
//             min: 8,
//             max: 50
//           }
//         },
//         isStrongPassword: {
//           options: {
//             minLength: 8,
//             minLowercase: 1,
//             minUppercase: 1,
//             minNumbers: 1,
//             minSymbols: 1
//           },
//           errorMessage:
//             'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
//         },
//         //mình tự tạo ra nó
//         //value(là cái trường dữ liệu mà em đang kiểm tra) trong trường hợp này là confirm_password
//         custom: {
//           options: (value, { req }) => {
//             //value là confirm_password
//             if (value !== req.body.password) {
//               throw new Error('Cofirmed password must be same password')
//               //có mã khác thì throw cái khác thôi khác thì throw new ErrorWithStatus
//               //trong này mặc định là 422 trong checkShema
//             } else {
//               return true
//             }
//           }
//         }
//         //trong checkSheme thì throw new error ngoài thì mình xài errorWithStatus
//       },
//       date_of_birth: {
//         isISO8601: {
//           options: {
//             strict: true,
//             strictSeparator: true
//           }
//         }
//       }
//     },
//     ['body']
//   )

//   //ở cái tầng này thì mình KHÔNG kiểm tra là password và confirmed password là giống nhau nha
//   //kiểm tra validata và sanitize
//   //ko kiểm tra logic ở đây, mình có thể nhưng mà mình k làm
//   /*
// middleware
// xài checkShema: validation, cp1 kiểm tra valid ko báo lỗi ,
// dùng
// middleware khác | controller
// validationResult(req)
// res.status(r00).json(error)
// */
// )

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
