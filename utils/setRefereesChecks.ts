import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with set referees resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { thesisId, referees } = data

      // checking for availability of thesis
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `invalid thesis id`,
        }
      }

      // checking for availability of referees
      for (let referee of referees) {
        if (!isValidObjectId(referee)) {
          return {
            exists: false,
            message: `invalid referee id(s)`,
          }
        }

        const fetchedReferee = await InstructorModel.findById(referee)
        if (!fetchedReferee) {
          return {
            exists: false,
            message: `referee with given id doesn't exist`,
          }
        }
      }

      const fetchedThesis = await ThesisModel.findById(thesisId)
      if (!fetchedThesis) {
        return {
          exists: false,
          message: `thesis with this id doesn't exists`,
        }
      }

      if (fetchedThesis._doc.status !== 'confirmed_by_guide') {
        return {
          exists: false,
          message: `thesis with this id isn't in "confirmed_by_guide" status`,
        }
      }

      return {
        exists: true,
        message: `givin ids are valid and available`,
      }
    } catch (error) {
      throw error
    }
  })()
}
