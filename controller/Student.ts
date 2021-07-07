import Department from './Department'

import { StudentI } from '../interface/index'

import ThesisModel from '../model/Thesis'

export default class Student implements StudentI {
  firstName: string
  lastName: string
  numericId: number
  studyField: string
  studyGrade: number
  entranceDate: string
  constructor(
    firstName: string,
    lastName: string,
    numericId: number,
    studyField: string,
    studyGrade: number,
    entranceDate: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.numericId = numericId
    this.studyField = studyField
    this.studyGrade = studyGrade
    this.entranceDate = entranceDate
  }

  assignToDepartment(department: Department): null {
    // add your code
    return null
  }

  public static setTitle(args: any): void {
    ;(async () => {
      try {
        const { thesisId, title } = args

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            'title.title': title,
            'title.status': 'pending',
            status: 'titled_pending',
          }
        )
      } catch (error) {
        throw error
      }
    })()
  }

  public static updateTitle(args: any): void {
    ;(async () => {
      try {
        const { thesisId, studentId, title } = args

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            'title.title': title,
            'title.status': 'pending',
            status: 'titled_pending',
          }
        )
      } catch (error) {
        throw error
      }
    })()
  }
}
