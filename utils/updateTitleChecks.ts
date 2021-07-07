import ThesisModel from '../model/Thesis'
import StudentModel from '../model/Student'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks associated with Update Title resolver
  // -----------------------------------------------------------------

  return (async () => {
    try {
      let { thesisId, studentId, title } = data

      // removing the whitespace from start and end of title string
      title = title.trim()

      // checks the validity of ids
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `given thesis Id is not valid`,
        }
      }

      if (!isValidObjectId(studentId)) {
        return {
          exists: false,
          message: `given student Id is not valid`,
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

      // checks availability of student
      const fetchedStudent = await StudentModel.findById(studentId)
      if (!fetchedStudent) {
        return {
          exists: false,
          message: `student with given id doesn't exist`,
        }
      }

      // checks whether student is assigned to thesis or not
      if (fetchedThesis._doc.studentId.toString() !== studentId) {
        return {
          exists: false,
          message: `student with numericId: ${fetchedStudent._doc.numericId} is not assigned to thesis with given id`,
        }
      }

      // checks whether thesis is in the "initiated" status
      if (fetchedThesis._doc.status !== 'titled_pending') {
        return {
          exists: false,
          message: `the thesis is not in "initiated" status`,
        }
      }

      //checks validity of the title
      if (title.length <= 8 || title.length >= 50) {
        return {
          exists: false,
          message:
            'title should be longer than 8 characters and shorter than 50 characters',
        }
      } else if (
        title.split(' ').length >= 10 ||
        title.split(' ').length <= 2
      ) {
        return {
          exists: false,
          message: 'total words used in title should be between 3 and 9',
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
