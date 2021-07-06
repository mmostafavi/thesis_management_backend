import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with confirm role resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { thesisId, referee } = data

      // checks for validity of givin ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `thesis id is not valid`,
        }
      }

      if (!isValidObjectId(referee)) {
        return {
          exists: false,
          message: `referee id is not valid`,
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
      const fetchedReferee = await InstructorModel.findById(referee)

      if (!fetchedReferee) {
        return {
          exists: false,
          message: `instructor with this id doesn't exist`,
        }
      }

      // checks whether instructor is assigned to thesis or not
      const refereeInThesis = fetchedThesis._doc.referees.find(
        (refereeDoc: any) => refereeDoc._id.toString() === referee
      )
      if (!refereeInThesis) {
        return {
          exists: false,
          message: `referee with this username:"${fetchedReferee._doc.authData.username}" isn't assigned to thesis with given id`,
        }
      }

      // checks whether the givin role for thesis is "pending" or not
      if (fetchedThesis._doc.status !== 'defence_date_set') {
        return {
          exists: false,
          message: `the status for given thesis isn't "defence_date_set"`,
        }
      }

      return {
        exists: true,
        message: `data is valid`,
      }
    } catch (error) {
      throw error
    }
  })()
}
