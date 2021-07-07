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
    } // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    let { thesisId, studentId, title } = req.body
    title = title.trim()

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'set_title_checks',
      data: {
        thesisId,
        studentId,
        title,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    Student.setTitle({ thesisId, title })
    res.status(200).send('successfully updated the title')
  } catch (error) {
    throw error
  }
}
