import { checkAvailability, populate } from '../../utils'

import Department from '../../controller/Department'
import Instructor from '../../controller/Instructor'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    // here....
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
