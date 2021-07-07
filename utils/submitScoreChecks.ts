import ThesisModel from '../model/Thesis'
import StudentModel from '../model/Student'
import { isValidObjectId } from 'mongoose'
import InstructorModel from '../model/Instructor'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with set Title resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      let { thesisId, supervisor, score } = data

      // checks the validity of ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `given thesis Id is not valid`,
        }
      }

      if (!isValidObjectId(supervisor)) {
        return {
          exists: false,
          message: `given supervisor Id is not valid`,
        }
      }

      // checks availability of thesis
      const fetchedThesis = await ThesisModel.findById(thesisId)
      if (!fetchedThesis) {
        return {
          exists: false,
          message: `thesis with given id doesn't exist`,
        }
      }

      // checks availability of supervisor
      const fetchedSupervisor = await InstructorModel.findById(supervisor)
      if (!fetchedSupervisor) {
        return {
          exists: false,
          message: `supervisor with given id doesn't exist`,
        }
      }

      // checks whether supervisor is assigned to thesis or not
      if (fetchedThesis._doc.supervisor._id.toString() !== supervisor) {
        return {
          exists: false,
          message: `supervisor with numericId: ${fetchedSupervisor._doc.numericId} is not assigned to thesis with given id`,
        }
      }

      // checks whether thesis is in the "initiated" status
      if (fetchedThesis._doc.status !== 'referees_confirmed') {
        return {
          exists: false,
          message: `the thesis is not in "referees_confirmed" status`,
        }
      }

      return {
        exists: true,
        message: 'given data is valid',
      }
    } catch (error) {
      throw error
    }
  })()
}
