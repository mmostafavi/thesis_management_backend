import InstructorModel from '../model/Instructor'
import StudentModel from '../model/Student'
import DepartmentModel from '../model/Department'
import Thesis from '../model/Thesis'
import ThesisModel from '../model/Thesis'

export const checkAvailability = async (payload: any) => {
  try {
    const { type, data } = payload

    if (type === 'instructor') {
      const result = await InstructorModel.findOne({
        'authData.username': data,
      })

      if (result) {
        return {
          exists: true,
          message: `user with username: ${data} exists`,
          result: result,
        }
      }

      return {
        exists: false,
        message: `user with username: ${data} doesn't exist`,
      }
    } else if (type === 'student') {
      const result = await StudentModel.findOne({ 'authData.username': data })

      if (result) {
        return {
          exists: true,
          message: `user with username: ${data} exists`,
          result: result,
        }
      }

      return {
        exists: false,
        message: `user with username: ${data} doesn't exist`,
      }
    } else if (type === 'thesis') {
      const result = await ThesisModel.findOne({ title: data })

      if (result) {
        return {
          exists: true,
          message: `thesis with title: ${data} exists`,
          result,
        }
      }

      return {
        exists: false,
        message: `thesis with title: ${data} doesn't exist`,
      }
    }
  } catch (error) {
    throw error
  }
}

export const populate = async (_id: string, type: string) => {
  if (type === 'department') {
    const fetchedDepartmentDoc = await DepartmentModel.findById(_id)
    return fetchedDepartmentDoc._doc
  } else if (type === 'student') {
    const fetchedStudent = await StudentModel.findById(_id)
    return fetchedStudent._doc
  }
}
