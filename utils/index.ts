import InstructorModel from '../model/Instructor'

export const checkAvailability = async (payload: any) => {
  if (payload.type === 'instructor') {
    const result = await InstructorModel.find({
      'authData.username': payload.data,
    })

    if (result.length > 0) {
      return {
        passed: false,
        message: 'user with this username exist',
      }
    }

    return {
      passed: true,
      message: "user with this username doesn't exist",
    }
  }

  throw new Error('')
}
