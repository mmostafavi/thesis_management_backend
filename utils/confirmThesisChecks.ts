import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with confirm thesis resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { thesisId, guide } = data

      // checks for validity of givin ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `thesis id is not valid`,
        }
      }

      // checks for validity of givin ids
      if (!isValidObjectId(guide)) {
        return {
          exists: false,
          message: `guide id is not valid`,
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

      // checks for availability of guide
      const fetchedGuide = await InstructorModel.findById(guide)

      if (!fetchedGuide) {
        return {
          exists: false,
          message: `guide with this id doesn't exist`,
        }
      }

      // checks whether guide is assigned to thesis or not
      if (fetchedThesis._doc.guide._id.toString() !== guide) {
        return {
          exists: false,
          message: `the guide with username:${fetchedGuide._doc.authData.username} is not assigned to given thesis`,
        }
      }

      // checks whether the givin role for thesis is "pending" or not
      if (fetchedThesis._doc.status !== 'titled') {
        return {
          exists: false,
          message: `the status of thesis isn't "titled" in the thesis with given id`,
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
