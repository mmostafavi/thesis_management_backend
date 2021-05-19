/*
  you may need to add authentication here
    app.use(student_Auth)
    app.use(instructor_Auth)
  you may need to add authentication here
 */
const express = require('express')
const authenticationRouter = express.Router()

authenticationRouter.get('/signup', (req: any, res: any, next: any) => {
  // ----------------------------------------------------------
  // Add validation for creating a thesis bellow
  // ----------------------------------------------------------
  // here....
  // ----------------------------------------------------------
  // Add validation for creating a thesis above
  // ----------------------------------------------------------
})

export default authenticationRouter
