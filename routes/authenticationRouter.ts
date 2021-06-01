import express from 'express'
import model from '../model/model'
import bcrypt from 'bcryptjs'
import InstructorModel from '../model/Instructor'
const authenticationRouter = express.Router()

authenticationRouter.post('/signup', async (req: any, res: any, next: any) => {
  // ----------------------------------------------------------
  // Add validation for signing up bellow
  // ----------------------------------------------------------
  // here....
  // ----------------------------------------------------------
  // Add validation for signing up above
  // ----------------------------------------------------------
  const { username, password, signupType, signupData } = req.body

  // password validation
  // ....write here....
  // password validation

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12)
  const newInstructorDoc = new InstructorModel({
    authData: {
      username: username,
      password: {
        type: String,
        required: true,
      },
    },

    fName: signupData.firstName,

    lName: signupData.lastName,

    specialty: signupData.specialty,

    rank: signupData.rank,

    departmentInfo: {
      name: signupData.departmentInfo.name,
      _id: signupData.departmentInfo._id,
      numericID: signupData.departmentInfo.numericID,
    },
  })
})

export default authenticationRouter
