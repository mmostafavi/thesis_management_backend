import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks checks associated with init thesis resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      const { thesisId, advisor, guide } = data

      // checking for availability of thesis
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `invalid thesis id`,
        }
      }

      const fetchedThesis = await ThesisModel.findById(thesisId)
      if (!fetchedThesis) {
        return {
          exists: false,
          message: `thesis with this id doesn't exists`,
        }
      }

      // checking for availability of advisor
      if (!isValidObjectId(advisor)) {
        return {
          exists: false,
          message: `invalid instructor id`,
        }
      }

      const fetchedAdvisor = await InstructorModel.findById(advisor)
      if (!fetchedAdvisor) {
        return {
          exists: false,
          message: `advisor instructor with this id doesn't exists`,
        }
      }

      // checking for availability of guide
      if (!isValidObjectId(guide)) {
        return {
          exists: false,
          message: `invalid instructor id`,
        }
      }

      const fetchedGuide = await InstructorModel.findById(guide)
      if (!fetchedGuide) {
        return {
          exists: false,
          message: `guide instructor with this id doesn't exists`,
        }
      }

      if (fetchedThesis._doc.status !== 'pending') {
        return {
          exists: false,
          message: `thesis with this id isn't in "pending" status`,
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
