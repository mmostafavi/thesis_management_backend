import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with confirm title resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { thesisId } = data

      // checks for validity of givin ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `thesis id is not valid`,
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

      // checks whether the givin role for thesis is "pending" or not
      if (fetchedThesis._doc.status !== 'titled_pending') {
        return {
          exists: false,
          message: `the status of thesis isn't "titled_pending" in thesis with given id`,
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
