import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'
import StudentModel from '../model/Student'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with get Thesis resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { userId, userType } = data

      // checks for validity of givin ids
      if (!isValidObjectId(userId)) {
        return {
          exists: false,
          message: `user id is not valid`,
        }
      }

      // checks for validity of givin userType
      if (!['student', 'instructor', 'manager'].find((el) => el === userType)) {
        return {
          exists: false,
          message: `user type is not valid`,
        }
      }

      // checks for availability of user
      let fetchedUser
      if (userType === 'student') {
        fetchedUser = await StudentModel.findById(userId)
      } else {
        fetchedUser = await InstructorModel.findById(userId)
      }

      if (!fetchedUser) {
        return {
          exists: false,
          message: `user with this id doesn't exist`,
        }
      }

      return {
        exists: true,
        message: `given data is valid`,
      }
    } catch (error) {
      throw error
    }
  })()
}
