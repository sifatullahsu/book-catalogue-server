import { Model, Types } from 'mongoose'

type iReading = {
  book: Types.ObjectId
  stage: 'Reading' | 'Reading Soon' | 'Finished'
}

export type iUser = {
  name: string
  email: string
  password: string
  wishlist: Types.ObjectId[]
  reading: iReading[]
}

export type iUserModel = {
  generateHashPassword(password: string): Promise<string>
  checkPassword(givenPassword: string, savedPassword: string): Promise<boolean>
} & Model<iUser>
