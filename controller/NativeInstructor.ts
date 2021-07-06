import Department from './Department'
import Instructor from './Instructor'
import Thesis from './Thesis'

import { NativeInstructorI } from '../interface/index'
import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'

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
        const { thesisId, instructorId } = args

        const fetchedThesis = await ThesisModel.findById(thesisId)

        fetchedThesis.guide.status = 'confirmed'
        await fetchedThesis.save()

        await InstructorModel.updateOne(
          {
            _id: instructorId,
            roles: {
              $elemMatch: {
                role: 'guide',
              },
            },
          },
          {
            $set: {
              'roles.$.status': 'confirmed',
            },
          }
        )

        // checks whether we should update title status to "initiated" or not
        if (fetchedThesis.advisor.status === 'confirmed') {
          fetchedThesis.status = 'initiated'

          await fetchedThesis.save()
        }
      } catch (error) {
        throw error
      }
    })()
  }

  public static supervise(args: any): void {
    // add code here
  }

  public static confirmThesis(args: any): void {
    ;(async () => {
      try {
        const { thesisId } = args

        await ThesisModel.updateOne(
          { _id: thesisId },
          {
            status: 'confirmed_by_guide',
            approvalDate: new Date().toISOString(),
          }
        )
      } catch (error) {
        throw error
      }
    })()
  }
}
