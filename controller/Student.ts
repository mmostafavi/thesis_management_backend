import DepartmentClass from './Department'

interface StudentI {
  firstName: string
  lastName: string
  studentNumber: number
  studyField: string
  studyGrade: number
  entranceDate: string
  assignToDepartment(d: DepartmentClass): null
}

export default class Student implements StudentI {
  firstName: string
  lastName: string
  studentNumber: number
  studyField: string
  studyGrade: number
  entranceDate: string
  constructor(
    firstName: string,
    lastName: string,
    studentNumber: number,
    studyField: string,
    studyGrade: number,
    entranceDate: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.studentNumber = studentNumber
    this.studyField = studyField
    this.studyGrade = studyGrade
    this.entranceDate = entranceDate
  }
  assignToDepartment(department: DepartmentClass): null {
    // add your code
    return null
  }
}
