import { Types } from 'mongoose'

export type iLoginUser = {
  email: string
  password: string
}

export type iLoginUserResponse = {
  accessToken: string
  refreshToken: string
  user: {
    _id: Types.ObjectId
    name: string
    email: string
  }
}
