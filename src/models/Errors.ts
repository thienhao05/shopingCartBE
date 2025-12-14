import HTTP_STATUS from '~/constants/httpStatus'

type ErrorType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
//giúp mình lấy ra lỗi đẹp

export class ErrorWithStatus {
  status: number
  message: string
  constructor({ status, message }: { status: number; message: string }) {
    this.status = status
    this.message = message
  }
}

//EntityError là object lỗi hiện có của em
export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({
    message = 'Validation Errors', //
    errors
  }: {
    message?: string //đừng thiếu ?
    errors: ErrorType
  }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) //new ErrorWithStatus
    this.errors = errors
  }
}
