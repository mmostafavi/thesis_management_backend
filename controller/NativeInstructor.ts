import Department from './Department'
import Instructor from './Instructor'
import Thesis from './Thesis'

import { NativeInstructorI } from '../interface/index'
import ThesisModel from '../model/Thesis'

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

  public static guide(args: any): void {
    ;(async () => {
      try {
        const { thesisId } = args

        await ThesisModel.findByIdAndUpdate(thesisId, {
          'guide.status': 'confirmed',
        })
      } catch (error) {
        throw error
      }
    })()
  }

  public static supervise(args: any): void {
    // add code here
  }
}
