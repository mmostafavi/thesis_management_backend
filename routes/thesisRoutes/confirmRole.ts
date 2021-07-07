import Instructor from '../../controller/Instructor'
import NativeInstructor from '../../controller/NativeInstructor'
import { checkAvailability, populate } from '../../utils'
import isInstructor from '../../utils/validators/isInstructor'

export default async (req: any, res: any) => {
  try {
    // ----------------------------------------------------------
    // Add validation for creating a thesis bellow
    // ----------------------------------------------------------
    if (!isInstructor(req.isAuth, req.userData, req.body.instructorId)) {
      return res
        .status(403)
        .send("this user doesn't have permission for this action")
    }
    // ----------------------------------------------------------
    // Add validation for creating a thesis above
    // ----------------------------------------------------------

    const { role, thesisId, instructorId } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'confirm_role_checks',
      data: {
        role,
        thesisId,
        instructorId,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    if (role === 'guide') {
      NativeInstructor.guide({ thesisId, instructorId })
    } else if (role === 'advisor') {
      Instructor.advise({ thesisId, instructorId })
    }

    return res
      .status(200)
      .send(
        `successful confirmation from instructor with id: ${instructorId} for role: ${role}`
      )
  } catch (err) {
    throw err
  }
}
