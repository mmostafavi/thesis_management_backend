import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { checkAvailability, populate } from '../../utils/index'

export default async function (req: any, res: any) {
  try {
    // ----------------------------------------------------------
    // Add validation for signing up bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for signing up above
    // ----------------------------------------------------------
    const { username, password } = req.body

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const studentExist = await checkAvailability({
      data: username,
      type: 'student',
    })

    if (studentExist!.exists) {
      res.status(403).send(studentExist!.message)
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        studentExist!.result._doc.authData.password
      )

      if (isPasswordCorrect) {
        const departmentInfo = await populate(
          studentExist!.result._doc.department._id,
          'department'
        )
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            username,
            departmentInfo,
          },
          process.env.JWT_KEY!
        )

        res.json({
          ...studentExist!.result._doc,
          token,
          authData: {
            ...studentExist!.result._doc.authData,
            password: null,
          },
        })
      } else {
        res.status(403).send(`password is incorrect`)
      }
    }
  } catch (err) {
    throw err
  }
}
