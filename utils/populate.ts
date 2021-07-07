import { isValidObjectId } from 'mongoose'

import StudentModel from '../model/Student'
import DepartmentModel from '../model/Department'
import ThesisModel from '../model/Thesis'

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
    } else if (type === 'thesis') {
      const fetchedStudent = await ThesisModel.findById(_id)
      return fetchedStudent._doc
    }
  } catch (error) {
    throw error
  }
}
