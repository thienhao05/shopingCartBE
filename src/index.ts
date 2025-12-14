import express from 'express'
import usersRoutes from './routes/users.routes'
import databaseServices from './services/database.services'
const app = express() // dung server len
const PORT = 3000

databaseServices.connect()
//1 người dùng gõ localhost:3000 sẽ tới app
app.use(express.json())
app.use('/users', usersRoutes)

//Error Handler Tổng
app.use((err, req, res, next) => {
  console.log('Lỗi nè' + err.message)
  return res.status(400).json({ message: err.message })
})

//cho app mo PORT
app.listen(PORT, () => {
  console.log(`Project nay dang chay tren localhost:${PORT}`)
})
