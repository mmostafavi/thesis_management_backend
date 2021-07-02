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

  createThesis(thesisInfo: any): void {
    const { title, studentId } = thesisInfo
    const thesisDoc = new ThesisModel({
      title,
      status: 'pending',
      student: studentId,
    })

    thesisDoc.save().catch((err: any) => {
      throw err
    })
  }
}
