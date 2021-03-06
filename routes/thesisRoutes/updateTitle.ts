import Student from '../../controller/Student'
import { checkAvailability, populate } from '../../utils'

import isStudent from '../../utils/validators/isStudent'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isStudent(req.isAuth, req.userData, req.body.studentId)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    const { thesisId, studentId, title } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'update_title_checks',
      data: {
        thesisId,
        studentId,
        title,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    // confirming title associated with thesisId
    Student.updateTitle({ thesisId, studentId, title })
    return res.status(200).send(`successful title update`)
  } catch (err) {
    throw err
  }
}
