import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import httpStatus from 'http-status'
import errorHandler from './app/middlewares/error_handler'
import AppRouter from './app/routes'

const app: Application = express()

// global middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// global app route
app.use('/', AppRouter)

// global error handler
app.use(errorHandler)

// 404 route handler
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found'
      }
    ],
    stack: ''
  })
})

export default app
