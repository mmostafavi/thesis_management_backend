import express from 'express'
const authRouter = express.Router()

import signupInstructor from './authRoutes/singupInstructor'
import loginInstructor from './authRoutes/loginInstructor'
import signupStudent from './authRoutes/signupStudent'
import loginStudent from './authRoutes/loginStudent'

authRouter.post('/signup-instructor', signupInstructor)
authRouter.get('/login-instructor', loginInstructor)
authRouter.post('/signup-student', signupStudent)
authRouter.get('/login-student', loginStudent)

export default authRouter
