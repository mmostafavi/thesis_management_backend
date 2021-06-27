import InstructorModel from '../model/Instructor'
import StudentModel from '../model/Student'
import DepartmentModel from '../model/Department'

export const checkAvailability = async (payload: any) => {
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
  }

  throw new Error('')
}

export const populate = async (_id: string, type: string) => {
  if (type === 'department') {
    const fetchedDepartmentDoc = await DepartmentModel.findById(_id)
    return fetchedDepartmentDoc._doc
  }
}
