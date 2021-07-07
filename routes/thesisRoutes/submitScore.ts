import NativeInstructor from '../../controller/NativeInstructor'
import Student from '../../controller/Student'
import { checkAvailability, populate } from '../../utils'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    let { thesisId, supervisor, score } = req.body
    // changing to number if it's string
    score = +score

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'submit_score_checks',
      data: {
        thesisId,
        supervisor,
        score,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    NativeInstructor.supervise({ thesisId, supervisor, score })
    res.status(200).send('score submitted successfully')
  } catch (error) {
    throw error
  }
}
