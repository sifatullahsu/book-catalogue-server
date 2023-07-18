import ApiError from '../../../errors/api_error'
import transformObject from '../../../helper/transformObject'
import { iUser } from './user.interface'
import User from './user.model'

export const getUserDB = async (id: string): Promise<iUser | null> => {
  const result = await User.findById(id)
    .populate('wishlist')
    .populate({ path: 'reading', populate: { path: 'book', model: 'Book' } })
  if (!result) throw new ApiError(404, 'Not found.')

  return result
}

export const updateUserDB = async (id: string, data: Partial<iUser>): Promise<iUser | null> => {
  data = transformObject(data)
  const result = await User.findByIdAndUpdate(id, data, { runValidators: true, new: true })

  return result
}

export const updateUserWishlistDB = async (id: string, data: Partial<iUser>): Promise<iUser | null> => {
  const find = await User.findOne({
    $and: [{ _id: id }, { wishlist: { $in: [data.wishlist] } }]
  })

  if (find) return find

  const result = await User.findByIdAndUpdate(
    id,
    { $push: { wishlist: data.wishlist } },
    { runValidators: true, new: true }
  )

  return result
}

export const updateUserReadingDB = async (
  id: string,
  data: { book: string; stage: string }
): Promise<iUser | null> => {
  const find = await User.findOneAndUpdate(
    {
      $and: [{ _id: id }, { 'reading.book': data.book }]
    },
    { $set: { 'reading.$.stage': data.stage } }
  ).select({ reading: 1 })

  if (find) return find

  const result = await User.findByIdAndUpdate(
    id,
    { $push: { reading: data } },
    { runValidators: true, new: true }
  )

  return result
}
