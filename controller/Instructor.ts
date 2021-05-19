import Thesis from './Thesis'

interface InstructorI {
  firstName?: string
  lastName?: string
  specialty?: []
  scientificLevel?: string
  advise?: (t: Thesis) => null
  judge?: (t: Thesis) => number
}

export default class Instructor implements InstructorI {
  firstName: string
  lastName: string
  specialty: []
  scientificLevel: string

  constructor(
    firstName: string,
    lastName: string,
    specialty: [],
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
