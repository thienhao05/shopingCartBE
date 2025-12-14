import express from 'express'
const app = express() // dung server len
import usersRoutes from './routes/users.routes'
const PORT = 3000 // tieu chuan cho back 8000 cho front

app.use(express.json())
app.use('/users', usersRoutes)

//cho app mo PORT
app.listen(PORT, () => {
  console.log(`Project nay dang chay tren localhost:${PORT}`)
})
