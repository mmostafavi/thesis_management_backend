import StudentModel from '../model/Student'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks  whether an instructor with given username exists or not
  // -----------------------------------------------------------------

  return (async () => {
    try {
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
    } catch (error) {
      throw error
    }
  })()
}
