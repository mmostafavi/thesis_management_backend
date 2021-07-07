import Department from '../../controller/Department'
import { checkAvailability, populate } from '../../utils'
import isManager from '../../utils/validators/isManager'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isManager(req.isAuth, req.userData, req.body.managerId)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    const { thesisId, advisor, guide, managerId } = req.body

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

    Department.initThesis({ thesisId, advisor, guide })
    res.status(200).send('thesis initiated successfully')
  } catch (error) {
    throw error
  }
}
