import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import { clerkMiddleware } from '@clerk/express'
import path from 'path'
import fileUploads from 'express-fileupload'


import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import songsRouter from './routes/songs.routers.js'
import albumsRouter from './routes/albun.routes.js'

dotenv.config()
const app = express()
const PORT =process.env.PORT
const __dirname = path.resolve()


app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUploads({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}))


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/songs",songsRouter)
app.use("/api/albums",albumsRouter)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
    connectDB()
})

