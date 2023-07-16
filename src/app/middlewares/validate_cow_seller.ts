import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import ApiError from '../../errors/api_error'
import Cow from '../modules/cow/cow.model'

export const validateCowSeller: RequestHandler = async (req, res, next) => {
  try {
    const verify = await Cow.findOne({ $and: [{ _id: req.params.id }, { seller: req.user?._id }] })
    if (!verify) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden access')

    next()
  } catch (error) {
    next(error)
  }
}
