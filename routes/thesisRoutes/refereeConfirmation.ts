import { checkAvailability, populate } from '../../utils'

import Department from '../../controller/Department'
import Instructor from '../../controller/Instructor'
import isInstructor from '../../utils/validators/isInstructor'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isInstructor(req.isAuth, req.userData, req.body.referee)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    let { thesisId, referee } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'referee_confirmation_checks',
      data: {
        thesisId,
        referee,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    Instructor.judge({ thesisId, referee })
    res.status(200).send('successful confirmation')
  } catch (error) {
    throw error
  }
}
