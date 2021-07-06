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

    const { thesisId, referees } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'set_referees_checks',
      data: {
        thesisId,
        referees,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    Department.setReferees({ thesisId, referees })
    res.status(200).send('referees assigned successfully')
  } catch (error) {
    throw error
  }
}
