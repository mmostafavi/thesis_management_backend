const express = require('express')
import ThesisModel from '../model/Thesis'
import ThesisController from '../controller/Thesis'

// import updateThesis from './thesisRoutes/updateThesis'

const thesisRouter = express.Router()

// thesisRouter.post('/update-thesis', updateThesis)

export default thesisRouter
