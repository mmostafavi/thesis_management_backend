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

    const { thesisId, advisor, guide } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'init_thesis_checks',
      data: {
        thesisId,
        advisor,
        guide,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    // fetch department info from coming req later
    const departmentInfo = {
      groupManager: 'id',
      name: 'Computer',
    }

    Department.initThesis({ thesisId, advisor, guide })
    res.status(200).send('thesis initiated successfully')
  } catch (error) {
    throw error
  }
}
