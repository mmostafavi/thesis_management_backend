import Department from '../../controller/Department'
import { checkAvailability, populate } from '../../utils'
import isInstructor from '../../utils/validators/isInstructor'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isInstructor(req.isAuth, req.userData, req.body.guide)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    const { thesisId, confirmation, guide } = req.body

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
    Department.confirmTitle({ thesisId, confirmation })
    return res.status(200).send(`successful title confirmation`)
  } catch (err) {
    throw err
  }
}
