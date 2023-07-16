import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/api_error'
import { createToken } from '../../../helper/jwtHelper'
import { iUser } from '../user/user.interface'
import User from '../user/user.model'
import { iLoginUser, iLoginUserResponse } from './auth.interface'

export const signUpUserDB = async (data: iUser): Promise<Partial<iUser>> => {
  const result = await User.create(data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...other } = result.toObject()

  return other
}

export const loginUserDB = async (data: iLoginUser): Promise<iLoginUserResponse> => {
  const { email, password } = data

  if (!email) throw new ApiError(httpStatus.NOT_FOUND, '"email" is required')
  if (!password) throw new ApiError(httpStatus.NOT_FOUND, '"password" is required')

  const user = await User.findOne({ email }, { _id: 1, name: 1, email: 1, password: 1 })
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not exist!')

  const isPasswordMatched = await User.checkPassword(password, user.password)
  if (!isPasswordMatched) throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized user!')

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email
  }

  const accessToken = createToken(payload, config.accessSecret as string, config.accessExpire as string)
  const refreshToken = createToken(payload, config.refreshSecret as string, config.refreshExpire as string)

  return {
    accessToken,
    refreshToken,
    user: payload
  }
}

export const getMeDB = async (token: string): Promise<Partial<iUser> | null> => {
  try {
    const verifyUser: JwtPayload | undefined = jwt.verify(token, config.accessSecret as string) as JwtPayload
    return await User.findById(verifyUser?._id).select({ name: 1, email: 1 })
  } catch (error) {
    return null
  }
}
