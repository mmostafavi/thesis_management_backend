import bcrypt, { hashSync } from 'bcryptjs'
import InstructorModel from '../model/Instructor'
import ThesisModel from '../model/Thesis'
import StudentModel from '../model/Student'
import Instructor from './Instructor'
import { DepartmentI } from '../interface/index'
import { PropertySignature } from 'typescript'
import { populate } from '../utils'

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
        const { thesisId, confirmation } = args

        if (confirmation) {
          await ThesisModel.updateOne(
            { _id: thesisId },
            {
              status: 'titled',
              'title.status': 'confirmed',
            }
          )
        } else {
          await ThesisModel.updateOne(
            { _id: thesisId },
            {
              status: 'initiated',
            }
          )
        }
      } catch (error) {
        throw error
      }
    })()
  }

  public static setReferees(args: any): void {
    ;(async () => {
      try {
        const { thesisId, referees } = args

        // transforming referee array to storable format
        let transformedReferees = referees.map((referee: any) => {
          return {
            _id: referee,
            confirmation: false,
          }
        })

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            $set: {
              referees: transformedReferees,
            },

            status: 'referees_assigned',
          }
        )

        for (let referee of referees) {
          await InstructorModel.updateOne(
            { _id: referee },
            {
              $push: {
                roles: {
                  role: 'referee',
                  status: 'confirmed',
                  thesisId: thesisId,
                },
              },
            }
          )
        }
      } catch (error) {
        throw error
      }
    })()
  }

  public static setDefenceDate(args: any): void {
    ;(async () => {
      try {
        const { thesisId, defenceDate, supervisor } = args

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            status: 'defence_date_set',
            defenceDate: new Date(defenceDate).toISOString(),
            'supervisor._id': supervisor,
            'supervisor.status': 'confirmed',
          }
        )

        await InstructorModel.updateOne(
          { _id: supervisor },
          {
            $push: {
              roles: {
                role: 'supervisor',
                status: 'confirmed',
                thesisId: thesisId,
              },
            },
          }
        )
      } catch (error) {
        throw error
      }
    })()
  }

  public static getThesis(args: any): any {
    const theses = (async () => {
      try {
        const { userId, userType } = args

        let transformedFetchedTheses = []
        if (userType === 'student') {
          const fetchedTheses = await ThesisModel.find({ studentId: userId })
          transformedFetchedTheses = fetchedTheses.map((thesis: any) => ({
            role: 'student',
            thesis: {
              ...thesis._doc,
            },
          }))
        } else if (userType === 'instructor') {
          const fetchedInstructor = await InstructorModel.findById(userId)

          for (let role of fetchedInstructor._doc.roles) {
            const populatedThesis = await populate(role.thesisId, 'thesis')
            transformedFetchedTheses.push({
              ...role._doc,
              thesisId: undefined,
              thesis: {
                ...populatedThesis,
              },
            })
          }
        } else if (userType === 'manager') {
          const fetchedTheses = await ThesisModel.find({})

          transformedFetchedTheses = fetchedTheses.map((thesis: any) => ({
            role: 'manager',
            thesis: {
              ...thesis._doc,
            },
          }))
        }

        return transformedFetchedTheses
      } catch (error) {
        throw error
      }
    })()

    return theses
  }
}
