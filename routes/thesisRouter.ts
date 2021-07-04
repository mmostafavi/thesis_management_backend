const express = require('express')
import ThesisModel from '../model/Thesis'
import ThesisController from '../controller/Thesis'

import initThesis from './thesisRoutes/initThesis'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)

export default thesisRouter
