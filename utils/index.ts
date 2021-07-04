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
      // checks  whether an instructor with given username exists or not
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
      // checks whether a student with given username exists or not
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
      // checks whether a thesis with given id exists or not

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
          message: `thesis with id: ${data} exists`,
          result,
        }
      }

      return {
        exists: false,
        message: `thesis with id: ${data} doesn't exist`,
      }
    } else if (type === 'init_thesis_checks') {
      const { thesisId, advisor, guide } = data

      // checking for availability of thesis
      if (!isValidObjectId(thesisId)) {
        return {
          exists: false,
          message: `invalid id: ${thesisId}`,
        }
      }

      const fetchedThesis = await ThesisModel.findById(thesisId)
      if (!fetchedThesis) {
        return {
          exists: false,
          message: `thesis with id: ${thesisId} doesn't exists`,
        }
      }

      // checking for availability of advisor
      if (!isValidObjectId(advisor)) {
        return {
          exists: false,
          message: `invalid id: ${advisor}`,
        }
      }

      const fetchedAdvisor = await InstructorModel.findById(advisor)
      if (!fetchedAdvisor) {
        return {
          exists: false,
          message: `Advisor Instructor with id: ${advisor} doesn't exists`,
        }
      }

      // checking for availability of guide
      if (!isValidObjectId(guide)) {
        return {
          exists: false,
          message: `invalid id: ${guide}`,
        }
      }

      const fetchedGuide = await InstructorModel.findById(guide)
      if (!fetchedGuide) {
        return {
          exists: false,
          message: `Guide Instructor with id: ${guide} doesn't exists`,
        }
      }

      return {
        exists: true,
        message: `givin ids are valid and available`,
      }
    }
  } catch (error) {
    throw error
  }
}

// fetches the associated doc with given id and returns that
export const populate = async (_id: string, type: string) => {
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
}
