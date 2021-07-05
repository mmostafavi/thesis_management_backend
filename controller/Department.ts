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
    ;(async () => {
      try {
        const { studentId } = thesisObj

        const thesisDoc = new ThesisModel({ studentId, status: 'pending' })
        const savedThesis = await thesisDoc.save()
        await StudentModel.updateOne(
          { _id: studentId },
          {
            thesisId: savedThesis._id,
          }
        )
      } catch (error) {
        throw error
      }
    })()
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

  public static initThesis(initData: any): void {
    ;(async () => {
      try {
        const { thesisId, advisor, guide } = initData

        await ThesisModel.findByIdAndUpdate(thesisId, {
          status: 'initiated_pending',
          'advisor._id': advisor,
          'advisor.status': 'pending',
          'guide._id': guide,
          'guide.status': 'pending',
        })

        await InstructorModel.findByIdAndUpdate(advisor, {
          $push: {
            roles: {
              role: 'advisor',
              status: 'pending',
              thesisId: thesisId,
            },
          },
        })

        await InstructorModel.findByIdAndUpdate(guide, {
          $push: {
            roles: {
              role: 'guide',
              status: 'pending',
              thesisId: thesisId,
            },
          },
        })
      } catch (error) {}
    })()
  }

  public static confirmTitle(args: any) {
    ;(async () => {
      try {
        const { thesisId } = args

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            status: 'titled',
            'title.status': 'confirmed',
          }
        )
      } catch (error) {
        throw error
      }
    })()
  }
}
