import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { verifyToken } from '../../helper/jwtHelper'

export const verifyMeToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization

    const verifyUser = verifyToken(token as string, config.accessSecret as string)

    req.user = verifyUser

    next()
  } catch (error) {
    return null
  }
}
