import Department from '../../controller/Department'
import Student from '../../controller/Student'
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
