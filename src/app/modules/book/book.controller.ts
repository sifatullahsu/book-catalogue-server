import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import apiResponse from '../../../shared/api_response'
import catchAsync from '../../../shared/catch_async'
import { iBook } from './book.interface'
import { createBookDB, deleteBookDB, getBookDB, getBooksDB, updateBookDB } from './book.service'

export const createBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await createBookDB(req.body)

  apiResponse<iBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book created successfully',
    data: result
  })
})

export const getBooks: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const query = req.query
  const result = await getBooksDB(query)

  apiResponse<iBook[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result
  })
})

export const getBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await getBookDB(req.params.id)

  apiResponse<iBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    data: result
  })
})

export const updateBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await updateBookDB(req.params.id, req.body)

  apiResponse<iBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book updated successfully',
    data: result
  })
})

export const deleteBook: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await deleteBookDB(req.params.id)

  apiResponse<iBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Book deleted successfully',
    data: result
  })
})
