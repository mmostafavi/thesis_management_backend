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

    const { userType, userId } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'get_thesis_checks',
      data: {
        userId,
        userType,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    const theses = Department.getThesis({ userType, userId })

    theses
      .then((result: any) => {
        res.status(200).json(result)
      })
      .catch((err: any) => {
        throw err
      })
  } catch (error) {
    throw error
  }
}
