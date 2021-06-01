import Instructor from './Instructor'
import { instructorInput, DepartmentI } from '../interface/index'

export default class Department implements DepartmentI {
  name: string
  manager: string
  constructor(name: string, groupManger: string) {
    this.name = name
    this.manager = groupManger
  }

  createInstructor(instructorObj: instructorInput): Instructor {
    const instructorTest = new Instructor(
      'Mahdi',
      'Mostafavi',
      ['IOT'],
      'professor'
    )
    return instructorTest
    // add logic
  }

  manageInstructor(instructor: Instructor): null {
    // add logic
    return null
  }
}
