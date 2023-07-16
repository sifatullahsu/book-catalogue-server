import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../config'
import ApiError from '../../errors/api_error'
import { verifyToken } from '../../helper/jwtHelper'

type iRoleType = 'admin' | 'seller' | 'buyer'

export const validateRole = (roles: iRoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')

      const verifyUser = verifyToken(token, config.accessSecret as string)
      if (!roles.includes(verifyUser.role)) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access')

      req.user = verifyUser

      next()
    } catch (error) {
      next(error)
    }
  }
}
