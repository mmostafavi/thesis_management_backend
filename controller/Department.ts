import bcrypt, { hashSync } from 'bcryptjs'
import InstructorModel from '../model/Instructor'
import ThesisModel from '../model/Thesis'
import StudentModel from '../model/Student'
import Instructor from './Instructor'
import { DepartmentI } from '../interface/index'
import { PropertySignature } from 'typescript'

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

    instructorDoc.save().catch((err: any) => {
      throw err
    })
  }

  manageInstructor(instructor: Instructor): void {
    // add logic
  }

  private createThesis(thesisObj: any): void {
    const { studentId } = thesisObj

    const thesisDoc = new ThesisModel({ studentId, status: 'pending' })

    thesisDoc.save().catch((err: any) => {
      throw err
    })
  }

  // creating a new student
  createStudent(studentData: any): void {
    ;(async () => {
      try {
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
        const hashedPassword = await bcrypt.hash(password, 12)
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

        const savedDoc = await studentDoc.save()

        await this.createThesis({ studentId: savedDoc._id })
      } catch (error) {
        throw error
      }
    })()
  }

  initThesis(initData: any): void {
    ;(async () => {
      try {
        const { thesisId, advisor, guide } = initData

        await ThesisModel.findByIdAndUpdate(thesisId, {
          'title.status': 'pending',
          'advisor._id': advisor,
          'advisor.status': 'pending',
          'guide._id': guide,
          'guide.status': 'pending',
        })
      } catch (error) {}
    })()
  }
}
