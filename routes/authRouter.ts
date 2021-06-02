import express from 'express'
import bcrypt from 'bcryptjs'
import InstructorModel from '../model/Instructor'
import Instructor from '../controller/Instructor'
import Department from '../controller/Department'
const authRouter = express.Router()

import { checkAvailability } from '../utils/index'

authRouter.post('/signup_instructor', async (req: any, res: any, next: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for signing up bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for signing up above
    // ----------------------------------------------------------
    const { username, password, signupData, departmentInfo } = req.body

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const instructorObj = {
      authData: { username, password },
      lName: signupData.lName,
      fName: signupData.fName,
      rank: signupData.rank,
      specialty: signupData.specialty,
      numericId: signupData.numericId,
      departmentInfo: {
        name: departmentInfo.name,
        numericId: departmentInfo.numericId,
        _id: departmentInfo._id,
      },
    }

    const departmentInstance = new Department(
      departmentInfo.name,
      departmentInfo.managerId
    )

    // checking for availability of instructor
    const instructorExists = await checkAvailability({
      data: username,
      type: 'instructor',
    })

    if (instructorExists?.passed) {
      departmentInstance.createInstructor(instructorObj)
      res.status(200).send(`user with username of ${username} is created`)
    } else {
      res.status(500).send(instructorExists?.message)
    }
  } catch (error) {
    res.status(500).send(error)
    throw error
  }
})

export default authRouter
