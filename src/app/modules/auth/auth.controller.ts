import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import apiResponse from '../../../shared/api_response'
import catchAsync from '../../../shared/catch_async'
import { iUser } from '../user/user.interface'
import { iLoginUserResponse } from './auth.interface'
import { getMeDB, loginUserDB, signUpUserDB } from './auth.service'

export const signUpUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await signUpUserDB(req.body)

  apiResponse<Partial<iUser>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users created successfully',
    data: result
  })
})

export const loginUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUserDB(req.body)

  const { refreshToken, ...others } = result

  const cookieOptions = {
    secure: config.env !== 'development',
    httpOnly: true
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  apiResponse<Pick<iLoginUserResponse, 'accessToken'>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: others
  })
})

export const getMe: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  const result = await getMeDB(token as string)

  apiResponse<Partial<iUser>>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: '',
    data: result
  })
})
