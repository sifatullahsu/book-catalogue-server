import { Response } from 'express'

type iApiReponse<T> = {
  success: boolean
  statusCode: number
  message: string
  meta?: {
    page?: number
    limit?: number
    count?: number
  }
  data: T | null
}

const apiResponse = <T>(res: Response, data: iApiReponse<T>): void => {
  const responseData: iApiReponse<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    meta: data?.meta && {
      page: data?.meta?.page,
      limit: data?.meta?.limit,
      count: data?.meta?.count
    }
  }

  res.status(data.statusCode).json(responseData)
}

export default apiResponse
