import InstructorModel from '../model/Instructor'
import StudentModel from '../model/Student'

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
