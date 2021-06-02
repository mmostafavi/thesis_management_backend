import Thesis from './Thesis'
import { InstructorI } from '../interface/index'

export default class Instructor implements InstructorI {
  firstName: string
  lastName: string
  specialty: Array<string>
  rank: number

  constructor(
    firstName: string,
    lastName: string,
    specialty: Array<string>,
    rank: number
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.specialty = specialty
    this.rank = rank
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
