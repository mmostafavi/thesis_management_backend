import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with confirm role resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { confirmationType, role, thesisId, instructorId } = data

      // checks for validity of givin ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `thesis id is not valid`,
        }
      }

      if (!isValidObjectId(instructorId)) {
        return {
          exists: false,
          message: `instructor id is not valid`,
        }
      }

      // checks for availability of thesis
      const fetchedThesis = await ThesisModel.findById(thesisId)

      if (!fetchedThesis) {
        return {
          exists: false,
          message: `thesis with this id doesn't exist`,
        }
      }

      // checks for availability of instructor
      const fetchedInstructor = await InstructorModel.findById(instructorId)

      if (!fetchedInstructor) {
        return {
          exists: false,
          message: `instructor with this id doesn't exist`,
        }
      }

      // checks whether instructor is assigned to thesis or not
      if (fetchedThesis._doc[role]._id.toString() !== instructorId) {
        return {
          exists: false,
          message: `instructor with this username:"${fetchedInstructor._doc.authData.username}" isn't assigned to thesis with given id`,
        }
      }

      // checks whether the givin role for thesis is "pending" or not
      if (fetchedThesis._doc[role].status !== 'pending') {
        return {
          exists: false,
          message: `the status for role: "${role}" isn't "pending" in thesis with given id`,
        }
      }

      return {
        exists: true,
        message: `instructor with username: "${fetchedInstructor._doc.authData.username}" is assigned to thesis with id: ${thesisId}`,
      }
    } catch (error) {
      throw error
    }
  })()
}
