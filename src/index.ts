import express from 'express'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const app = express() // dung server len
import usersRoutes from './routes/users.routes'
const PORT = 3000 // tieu chuan cho back 8000 cho front

app.use(express.json())
app.use('/users', usersRoutes)

=======
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
import usersRoutes from './routes/users.routes'
import databaseServices from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
// import { run } from './services/database.services'
const app = express() // dung server len
const PORT = 3000 // 4000 cho back và 8000 cho front

// run() //muốn cho mongo chạy trong file index.ts
databaseServices.connect()
//1 người dùng gõ localhost:3000 sẽ tới app
app.use(express.json())
app.use('/users', usersRoutes)

//Error Handler Tổng
app.use(defaultErrorHandler)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> users/logout
=======
>>>>>>> fixJwtTokenStrong
=======
>>>>>>> origin/update-verifyEmail-resendVerifyEmail-forgotPassword
=======
>>>>>>> reset-password/getme
//cho app mo PORT
app.listen(PORT, () => {
  console.log(`Project nay dang chay tren localhost:${PORT}`)
})
