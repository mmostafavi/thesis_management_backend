import Department from './Department'
import Instructor from './Instructor'
import Thesis from './Thesis'

import { NativeInstructorI } from '../interface/index'

export default class NativeInstructor
  extends Instructor
  implements NativeInstructorI
{
  id: number
  department: Department
  constructor(
    firstName: string,
    lastName: string,
    specialty: [],
    scientificLevel: any,
    id: number,
    department: Department
  ) {
    super(firstName, lastName, specialty, scientificLevel)
    this.id = id
    this.department = department
  }

  guiding(thesis: Thesis): null {
    // add code here
    return null
  }

  supervise(thesis: Thesis): null {
    // add code here
    return null
  }
}
