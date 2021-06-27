import express from 'express'
const authRouter = express.Router()

import signupInstructor from './authRoutes/singupInstructor'
import loginInstructor from './authRoutes/loginInstructor'
import signupStudent from './authRoutes/signupStudent'

authRouter.post('/signup-instructor', signupInstructor)
authRouter.get('/login-instructor', loginInstructor)
authRouter.post('/signup-student', signupStudent)

export default authRouter
