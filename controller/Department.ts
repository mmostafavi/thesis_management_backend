import bcrypt, { hashSync } from 'bcryptjs'
import InstructorModel from '../model/Instructor'
import Instructor from './Instructor'
import { instructorInput, DepartmentI } from '../interface/index'

export default class Department implements DepartmentI {
  name: string
  manager: string
  constructor(name: string, groupManger: string) {
    this.name = name
    this.manager = groupManger
  }

  createInstructor(instructorData: instructorInput): string {
    const {
      authData: { username, password },
      lName,
      fName,
      rank,
      specialty,
      numericId,
      departmentInfo: { name, numericId: departmentNumericId, _id },
    } = instructorData

    // hashing the password
    const hashedPassword = bcrypt.hashSync(password, 12)
    const instructorDoc = new InstructorModel({
      authData: {
        username,
        password: hashedPassword,
      },
      lName,
      fName,
      rank,
      specialty,
      numericId,
      departmentInfo: {
        name,
        numericID: departmentNumericId,
        _id,
      },
    })

    return instructorDoc.save().catch((err: any) => {
      throw err
    })
  }

  manageInstructor(instructor: Instructor): null {
    // add logic
    return null
  }
}
