const express = require('express')
import ThesisModel from '../model/Thesis'
import ThesisController from '../controller/Thesis'

const thesisRouter = express.Router()

thesisRouter.post('/createThesis', (req: any, res: any, next: any) => {
  // ----------------------------------------------------------
  // Add validation for creating a thesis bellow
  // ----------------------------------------------------------
  // here....
  // ----------------------------------------------------------
  // Add validation for creating a thesis above
  // ----------------------------------------------------------
})

export default thesisRouter
