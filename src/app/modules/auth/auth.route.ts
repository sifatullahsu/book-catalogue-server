import express from 'express'
import { getMe, loginUser, signUpUser } from './auth.controller'

const v1AuthRoute = express.Router()

/* 
Route: /api/v1/auth/signup (POST)
Route: /api/v1/auth/login (POST)
*/

v1AuthRoute.post('/signup', signUpUser)
v1AuthRoute.post('/login', loginUser)
v1AuthRoute.get('/me', getMe)

export default v1AuthRoute
