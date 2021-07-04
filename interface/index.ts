import Department from '../controller/Department'
import Instructor from '../controller/Instructor'
import Thesis from '../controller/Thesis'
import Student from '../controller/Student'

// export interface instructorInput {
//   authData: {
//     username: string
//     password: string
//   }
//   fName: string
//   lName: string
//   specialty: Array<string>
//   rank: number
//   numericId: number
//   departmentInfo: {
//     numericId: number
//     name: string
//     _id: string
//   }
// }

export interface DepartmentI {
  name?: string
  manager?: string
  createInstructor(instructorData: any): void
  createStudent(studentData: any): void
  initThesis(initData: any): void
  manageInstructor(i: Instructor): void
}

export interface InstructorI {
  firstName?: string
  lastName?: string
  specialty?: Array<string>
  rank?: number
  advise?: (t: Thesis) => null
  judge?: (t: Thesis) => number
}

export interface NativeInstructorI {
  id?: number
  department?: Department
  guiding(t: Thesis): null
  supervise(t: Thesis): null
}

export interface StudentI {
  firstName: string
  lastName: string
  numericId: number
  studyField: string
  studyGrade: number
  entranceDate: string
  assignToDepartment(d: Department): null
}

export interface ThesisI {
  subject: string
  submissionDate: string
  defenceDate: string
  endDate: string
  grade: number
  student: Student
  state: string
  advisorInstructor: Instructor
  counselorInstructor: Instructor
  refereeInstructors: Instructor
  supervisorInstructor: Instructor
}
