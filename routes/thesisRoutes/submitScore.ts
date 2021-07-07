import NativeInstructor from '../../controller/NativeInstructor'
import Student from '../../controller/Student'
import { checkAvailability, populate } from '../../utils'
import isInstructor from '../../utils/validators/isInstructor'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isInstructor(req.isAuth, req.userData, req.body.supervisor)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
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
