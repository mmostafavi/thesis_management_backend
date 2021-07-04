import Thesis from './Thesis'
import { InstructorI } from '../interface/index'
import ThesisModel from '../model/Thesis'

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
        const { thesisId } = args

        await ThesisModel.findByIdAndUpdate(thesisId, {
          'advisor.status': 'confirmed',
        })
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
