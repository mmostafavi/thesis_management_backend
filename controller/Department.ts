import Instructor from './Instructor'

interface instructorInput {
  firstName: string
  lastName: string
  specialty: []
  scientificLevel: number
  id: number
  department: Department
}

interface DepartmentI {
  name?: string
  manager?: string
  createInstructor(instructorObj: instructorInput): Instructor
  manageInstructor(i: Instructor): null
}

export default class Department implements DepartmentI {
  name: string
  manager: string
  constructor(name: string, groupManger: string) {
    this.name = name
    this.manager = groupManger
  }

  createInstructor(instructorObj: instructorInput): Instructor {
    // add logic
  }

  manageInstructor(instructor: Instructor): null {
    // add logic
    return null
  }
}
