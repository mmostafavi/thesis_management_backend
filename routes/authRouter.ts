import express from 'express'
import Department from '../controller/Department'
const authRouter = express.Router()

import signupInstructor from './authRoutes/singupInstructor'
import loginInstructor from './authRoutes/loginInstructor'
import { checkAvailability } from '../utils/index'

authRouter.post('/signup-instructor', signupInstructor)
authRouter.get('/login-instructor', loginInstructor)

export default authRouter
