import { isValidObjectId } from 'mongoose'

import InstructorModel from '../model/Instructor'
import StudentModel from '../model/Student'
import DepartmentModel from '../model/Department'
import Thesis from '../model/Thesis'
import ThesisModel from '../model/Thesis'

export const checkAvailability = async (payload: any) => {
  try {
    const { type, data } = payload

    if (type === 'instructor') {
      // -----------------------------------------------------------------
      // checks  whether an instructor with given username exists or not
      // -----------------------------------------------------------------

      const result = await InstructorModel.findOne({
        'authData.username': data,
      })

      if (result) {
        return {
          exists: true,
          message: `instructor with username: ${data} exists`,
          result: result,
        }
      }

      return {
        exists: false,
        message: `instructor with username: ${data} doesn't exist`,
      }
    } else if (type === 'student') {
      // -------------------------------------------------------------
      // checks whether a student with given username exists or not
      // -------------------------------------------------------------

      const result = await StudentModel.findOne({ 'authData.username': data })

      if (result) {
        return {
          exists: true,
          message: `student with username: ${data} exists`,
          result: result,
        }
      }

      return {
        exists: false,
        message: `student with username: ${data} doesn't exist`,
      }
    } else if (type === 'thesis') {
      // ----------------------------------------------------
      // checks whether a thesis with given id exists or not
      // ----------------------------------------------------

      if (!isValidObjectId(data)) {
        return {
          exists: false,
          message: `invalid id: ${data}`,
        }
      }

      const result = await ThesisModel.findById(data)

      if (result) {
        return {
          exists: true,
          message: `thesis with this id already exists`,
          result,
        }
      }

      return {
        exists: false,
        message: `thesis with this id doesn't exist`,
      }
    } else if (type === 'init_thesis_checks') {
      // ----------------------------------------------------
      // checks associated with init thesis resolver
      // ----------------------------------------------------
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
    } else if (type === 'confirm_role_checks') {
      // ----------------------------------------------------
      // checks associated with confirm role resolver
      // ----------------------------------------------------

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
    } else if (type === 'set_title_checks') {
      // ------------------------------------------------------------
      // checks associated with set title resolver
      // ------------------------------------------------------------
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
      if (fetchedThesis._doc.status !== 'initiated') {
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
    }
  } catch (error) {
    throw error
  }
}

// fetches the associated doc with given id and returns that
export const populate = async (_id: string, type: string) => {
  try {
    if (!isValidObjectId(_id)) {
      return {
        exists: false,
        message: `invalid id: ${_id}`,
      }
    }

    if (type === 'department') {
      const fetchedDepartmentDoc = await DepartmentModel.findById(_id)
      return fetchedDepartmentDoc._doc
    } else if (type === 'student') {
      const fetchedStudent = await StudentModel.findById(_id)
      return fetchedStudent._doc
    }
  } catch (error) {
    throw error
  }
}
