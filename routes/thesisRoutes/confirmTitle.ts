import Department from '../../controller/Department'
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

    const { thesisId } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'confirm_title_checks',
      data: {
        thesisId,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    // confirming title associated with thesisId
    Department.confirmTitle({ thesisId })
    return res.status(200).send(`successful title confirmation`)
  } catch (err) {
    throw err
  }
}
