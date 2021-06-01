import Instructor from './Instructor'
import Student from './Student'

import { ThesisI } from '../interface/index'

export default class Thesis implements ThesisI {
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
  constructor(
    subject: string,
    submissionDate: string,
    defenceDate: string,
    endDate: string,
    grade: number,
    student: Student,
    state: string,
    advisorInstructor: Instructor,
    counselorInstructor: Instructor,
    refereeInstructors: Instructor,
    supervisorInstructor: Instructor
  ) {
    this.subject = subject
    this.submissionDate = submissionDate
    this.defenceDate = defenceDate
    this.endDate = endDate
    this.grade = grade
    this.student = student
    this.state = state
    this.advisorInstructor = advisorInstructor
    this.counselorInstructor = counselorInstructor
    this.refereeInstructors = refereeInstructors
    this.supervisorInstructor = supervisorInstructor
  }
}
