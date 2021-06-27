import bcrypt, { hashSync } from 'bcryptjs'
import InstructorModel from '../model/Instructor'
import StudentModel from '../model/Student'
import Instructor from './Instructor'
import { DepartmentI } from '../interface/index'

export default class Department implements DepartmentI {
  name: string
  manager: string
  constructor(name: string, groupManager: string) {
    this.name = name
    this.manager = groupManager
  }

  createInstructor(instructorData: any): void {
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

  // creating a new student
  createStudent(studentData: any): void {
    const {
      authData: { username, password },
      lName,
      fName,
      major,
      grade,
      entrance,
      numericId,
      department,
    } = studentData

    // hashing the password
    const hashedPassword = bcrypt.hashSync(password, 12)
    const studentDoc = new StudentModel({
      authData: {
        username,
        password: hashedPassword,
      },
      lName,
      fName,
      major,
      grade,
      entrance,
      numericId,
      department,
    })

    return studentDoc.save().catch((err: any) => {
      throw err
    })
  }
}
