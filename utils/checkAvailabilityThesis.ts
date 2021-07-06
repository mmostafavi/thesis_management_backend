import ThesisModel from '../model/Thesis'
import { isValidObjectId } from 'mongoose'

export default (data: any) => {
  // -----------------------------------------------------------------
  // checks whether a thesis exists or not
  // -----------------------------------------------------------------

  return (async () => {
    try {
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
    } catch (error) {
      throw error
    }
  })()
}
