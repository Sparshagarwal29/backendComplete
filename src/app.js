import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({
   origin: process.env.CORS_ORIGIN,
   Credential: true
}))
app.use(express.json({limit: '20kb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'


//decleration
app.use("/api/v1/user", userRouter)
export {app}