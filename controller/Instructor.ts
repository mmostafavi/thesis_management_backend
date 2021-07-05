import Thesis from './Thesis'
import { InstructorI } from '../interface/index'
import ThesisModel from '../model/Thesis'
import InstructorModel from '../model/Instructor'

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

  public static advise(args: any): void {
    ;(async () => {
      try {
        const { thesisId, instructorId } = args

        const fetchedThesis = await ThesisModel.findById(thesisId)

        //updating the status of advisor in thesis
        fetchedThesis.advisor.status = 'confirmed'
        await fetchedThesis.save()

        //updating the status of advisor in instructor DOC
        await InstructorModel.updateOne(
          {
            _id: instructorId,
            roles: {
              $elemMatch: {
                role: 'advisor',
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
        if (fetchedThesis.guide.status === 'confirmed') {
          fetchedThesis.status = 'initiated'

          await fetchedThesis.save()
        }
      } catch (error) {
        throw error
      }
    })()
  }

  public static judge(args: any): number {
    //do sth
    return 0
  }
}
