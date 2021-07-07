import { checkAvailability, populate } from '../../utils'

import Department from '../../controller/Department'

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

    let { thesisId, defenceDate, supervisor, managerId } = req.body

    // checking for validity of ids
    const dataIsValid = await checkAvailability({
      type: 'set_defence_date_checks',
      data: {
        thesisId,
        defenceDate,
        supervisor,
      },
    })

    if (!dataIsValid?.exists) {
      return res.status(500).send(dataIsValid?.message)
    }

    Department.setDefenceDate({ thesisId, defenceDate, supervisor })
    res.status(200).send('successfully set the defence date and supervisor')
  } catch (error) {
    throw error
  }
}
