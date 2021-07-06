import Department from '../../controller/Department'
import NativeInstructor from '../../controller/NativeInstructor'
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

    const { thesisId, guide } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'confirm_thesis_checks',
      data: {
        thesisId,
        guide,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    // confirming title associated with thesisId
    NativeInstructor.confirmThesis({ thesisId })
    return res.status(200).send(`successful Thesis confirmation`)
  } catch (err) {
    throw err
  }
}
