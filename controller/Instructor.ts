import Thesis from './Thesis'
import { InstructorI } from '../interface/index'
import { specialtyI } from '../interface/index'

export default class Instructor implements InstructorI {
  firstName: string
  lastName: string
  specialty: specialtyI
  scientificLevel: string

  constructor(
    firstName: string,
    lastName: string,
    specialty: specialtyI,
    scientificLevel: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.specialty = specialty
    this.scientificLevel = scientificLevel
  }

  advise(thesis: Thesis): null {
    // advising the student
    return null
  }

  judge(thesis: Thesis): number {
    //do sth
    return 0
  }
}
