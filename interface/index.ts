import Department from '../controller/Department'
import Instructor from '../controller/Instructor'
import Thesis from '../controller/Thesis'
import Student from '../controller/Student'

export interface DepartmentI {
  name?: string
  manager?: string
  createInstructor(instructorData: any): void
  createStudent(studentData: any): void
  initThesis?(initData: any): void
  confirmThesis?(confirmationData: any): void
  setDefenceDate?(setDefenceDate: any): void
  manageInstructor(i: Instructor): void
}

export interface InstructorI {
  firstName?: string
  lastName?: string
  specialty?: Array<string>
  rank?: number
  advise?: (t: Thesis) => void
  judge?: (t: Thesis) => void
}

export interface NativeInstructorI {
  id?: number
  department?: Department
  guide?(inputData: any): void
  supervise?(inputData: any): void
  confirmThesis?(inputData: any): void
}

export interface StudentI {
  firstName: string
  lastName: string
  numericId: number
  studyField: string
  studyGrade: number
  entranceDate: string
  assignToDepartment(d: Department): void
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
