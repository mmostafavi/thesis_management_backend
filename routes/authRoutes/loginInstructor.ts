import Department from '../../controller/Department'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Instructor from '../../controller/Instructor'
import InstructorModel from '../../model/Instructor'

export default async function (req: any, res: any, next: any) {
  try {
    // ----------------------------------------------------------
    // Add validation for signing up bellow
    // ----------------------------------------------------------
    // here....
    // ----------------------------------------------------------
    // Add validation for signing up above
    // ----------------------------------------------------------
    const { username, password, departmentInfo } = req.body

    // ----------------------------------------------------------
    // password validation
    // here....
    // password validation
    // ----------------------------------------------------------

    const instructorDoc = await InstructorModel.findOne({
      'authData.username': username,
    })

    if (instructorDoc === null) {
      res.status(403).send(`user with ${username} username doesn't exist`)
      return next()
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        instructorDoc._doc.authData.password
      )

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            username,
            departmentInfo,
          },
          process.env.JWT_KEY!
        )

        res.json({
          ...instructorDoc._doc,
          token,
          authData: {
            ...instructorDoc._doc.authData,
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