import Department from '../../controller/Department'
import { checkAvailability } from '../../utils/index'

export default async function (req: any, res: any) {
  try {
    // ----------------------------------------------------------
    // Add validation for signing up bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for signing up above
    // ----------------------------------------------------------
    const { username, password, signupData, departmentInfo } = req.body

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const studentObj = {
      authData: { username, password },
      lName: signupData.lName,
      fName: signupData.fName,
      major: signupData.major,
      grade: +signupData.grade,
      entrance: +signupData.entrance,
      numericId: signupData.numericId,
      department: departmentInfo._id,
    }

    // creating a department instance
    const departmentInstance = new Department(
      departmentInfo.name,
      departmentInfo.managerId
    )

    // checking for availability of instructor
    const studentExist = await checkAvailability({
      data: username,
      type: 'student',
    })

    if (!studentExist?.exists) {
      departmentInstance.createStudent(studentObj)
      res.status(200).send(`user with username of ${username} created`)
    } else {
      res.status(500).send(studentExist?.message)
    }
  } catch (error) {
    res.status(500).send(error)
    throw error
  }
}
