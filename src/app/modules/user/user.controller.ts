import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import apiResponse from '../../../shared/api_response'
import catchAsync from '../../../shared/catch_async'
import { iUser } from './user.interface'
import { getUserDB, updateUserDB, updateUserReadingDB, updateUserWishlistDB } from './user.service'

export const getUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await getUserDB(req.params.id)

  apiResponse<iUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User retrieved successfully',
    data: result
  })
})

export const updateUser: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await updateUserDB(req.params.id, req.body)

  apiResponse<iUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result
  })
})

export const updateUserWishlist: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await updateUserWishlistDB(req.params.id, req.body)

  apiResponse<iUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result
  })
})

export const updateUserReading: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await updateUserReadingDB(req.params.id, req.body)

  apiResponse<iUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result
  })
})
