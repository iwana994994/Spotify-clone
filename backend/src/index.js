import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import { clerkMiddleware } from '@clerk/express'
import path from 'path'
import fileUploads from 'express-fileupload'
import cors from 'cors'
import { createServer } from 'http'
import { initializeSockets } from './lib/socket.js'
import cron from 'node-cron '
import fs from 'fs'


import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.routes.js'
import songsRouter from './routes/songs.routers.js'
import albumsRouter from './routes/album.routes.js'


dotenv.config()
const app = express()
const PORT =process.env.PORT
const __dirname = path.resolve()

const httpServer = createServer(app)
initializeSockets(httpServer)

app.use(cors({
  origin: "http://localhost:3000", // Adjust the origin as needed
  
  credentials: true, // Allow credentials if needed
 
}))

app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUploads({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}))

//cron jobs
const tmpDir=path.join(process.cwd(),"tmp")
cron.schedule('0 * * * *', () => {
  if(fs.existsSync(tmpDir)){
    fs.readdir(tmpDir , (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tmpDir, file), (err) => {});
      }
     
  }
  )
}
})

  
  if(!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir)
  }

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/songs",songsRouter)
app.use("/api/albums",albumsRouter)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
  })
}



httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
    connectDB()
})

