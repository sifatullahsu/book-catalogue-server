import ApiError from '../../../errors/api_error'
import transformObject from '../../../helper/transformObject'
import { iUser } from './user.interface'
import User from './user.model'

// export const getUsersDB = async (): Promise<iUser[]> => {
//   const query = {}
//   const result = await User.find(query)

//   return result
// }

export const getUserDB = async (id: string): Promise<iUser | null> => {
  const result = await User.findById(id).populate('wishlist')
  if (!result) throw new ApiError(404, 'Not found.')

  return result
}

export const updateUserDB = async (id: string, data: Partial<iUser>): Promise<iUser | null> => {
  data = transformObject(data)
  const result = await User.findByIdAndUpdate(id, data, { runValidators: true, new: true })

  return result
}

export const updateUserWishlistDB = async (id: string, data: Partial<iUser>): Promise<iUser | null> => {
  const result = await User.findByIdAndUpdate(
    id,
    { $push: { wishlist: data.wishlist } },
    { runValidators: true, new: true }
  )

  return result
}

// export const deleteUserDB = async (id: string): Promise<iUser | null> => {
//   const result = await User.findByIdAndDelete(id)

//   return result
// }
