import InstructorModel from '../model/Instructor'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks  whether an instructor with given username exists or not
  // -----------------------------------------------------------------

  return (async () => {
    try {
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
    } catch (error) {
      throw error
    }
  })()
}
