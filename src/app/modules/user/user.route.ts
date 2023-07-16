import express from 'express'
import { getUser, updateUser, updateUserWishlist } from './user.controller'

const v1UserRoute = express.Router()

// v1UserRoute.get('/', getUsers)
// v1UserRoute.delete('/:id', deleteUser)

v1UserRoute.get('/:id', getUser)
v1UserRoute.patch('/:id', updateUser)
v1UserRoute.patch('/:id/wishlist', updateUserWishlist)

export default v1UserRoute
