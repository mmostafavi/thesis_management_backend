import Department from '../../controller/Department'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Instructor from '../../controller/Instructor'
import InstructorModel from '../../model/Instructor'
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
    console.log('username: ', username)

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const instructorExists = await checkAvailability({
      type: 'instructor',
      data: username,
    })

    if (!instructorExists!.exists) {
      res.status(403).send(instructorExists!.message)
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        instructorExists?.result._doc.authData.password
      )

      const populatedDepartment = await populate(
        instructorExists!.result._doc.departmentInfo._id,
        'department'
      )

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            tokenType: 'instructor',
            username,
            departmentInfo: populatedDepartment,
            userId: instructorExists.result.id.toString(),
            numericId: instructorExists.result._doc.numericId,
            fName: instructorExists.result._doc.fName,
            lName: instructorExists.result._doc.lName,
          },
          process.env.JWT_KEY!,
          { expiresIn: '1h' }
        )

        res.json({
          ...instructorExists!.result._doc,
          token,
          authData: {
            ...instructorExists!.result._doc.authData,
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
