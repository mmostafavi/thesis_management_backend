import Department from '../../controller/Department'
import Instructor from '../../controller/Instructor'
import NativeInstructor from '../../controller/NativeInstructor'
import Student from '../../controller/Student'
import InstructorModel from '../../model/Instructor'
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

    const { confirmationType, role, thesisId, instructorId } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'confirm_role_checks',
      data: {
        confirmationType,
        role,
        thesisId,
        instructorId,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    if (role === 'guide') {
      NativeInstructor.guide({ thesisId })
    } else if (role === 'advisor') {
      Instructor.advise({ thesisId })
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
