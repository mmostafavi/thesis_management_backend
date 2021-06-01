import Department from '../controller/Department'
import Instructor from '../controller/Instructor'
import Thesis from '../controller/Thesis'
import Student from '../controller/Student'

export interface instructorInput {
  firstName: string
  lastName: string
  specialty: specialtyI
  scientificLevel: number
  id: number
  department: Department
}

export interface DepartmentI {
  name?: string
  manager?: string
  createInstructor(instructorObj: instructorInput): Instructor
  manageInstructor(i: Instructor): null
}

export interface specialtyI {
  [index: number]: string
}

export interface InstructorI {
  firstName?: string
  lastName?: string
  specialty?: specialtyI
  scientificLevel?: string
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
  studentNumber: number
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
