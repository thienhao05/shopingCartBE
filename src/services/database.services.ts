import { Collection, Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import User from '~/models/User.schema'
dotenv.config() //kết nối đến file .env

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.kahzmom.mongodb.net/?appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseServices {
  private client: MongoClient //prop
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME) //k quan trọng
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 }) //ping 1 thành công connect oke
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.error(error) //màu đỏ thấy đường
      throw error
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string) //kết nối vào tên của collection k thể undefined
  }
}

// const client = new MongoClient(uri) //người sử dụng mongo là mình á, tự tạo account cho chính mình

// không muốn chạy run ngay chỗ này

//tạo instance và export instance đó
const databaseServices = new DatabaseServices()
export default databaseServices
