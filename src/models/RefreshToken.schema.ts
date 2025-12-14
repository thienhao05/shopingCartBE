import { ObjectId } from 'mongodb'
//interface dùng để định nghĩa kiểu dữ liệu
//interface không có thể dùng để tạo ra đối tượng
interface RefreshTokenType {
  _id?: ObjectId //khi tạo cũng k cần
  token: string //mã mình lưu
  created_at?: Date // k có cũng đc, khi tạo object thì ta sẽ new Date() sau
  //thì trong mongo có 1 cái hệ thống có tên là ttl: time to live có nghĩa anh có thể setup là mã này 30 ngày, sau 30  ngày thì hệ thống sẽ tự xóa
  //mã ra hệ thống chỉ có mongo mới có hệ thống này
  //bên C# tụi mình sử dụng 1 cái công nghệ cronjob, cứ đến 30 ngày thì tự xóa
  user_id: ObjectId
}
//ttl: C#: cronjob
//class dùng để tạo ra đối tượng
//class sẽ thông qua interface
//thứ tự dùng như sau
//class này < databse < service < controller < route < app.ts < server.ts < index.ts

export default class RefreshToken {
  _id?: ObjectId //khi client gửi lên thì không cần truyền _id
  token: string
  created_at: Date
  user_id: ObjectId
  constructor({ _id, token, created_at, user_id }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
  }
}
