//định nghĩa những gì người dùng sẽ gửi lên
export interface RegisterReqBody {
  email: string
  name: string
  password: string
  confirm_password: string
  date_of_birth: string
}
