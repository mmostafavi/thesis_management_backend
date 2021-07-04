const express = require('express')
import ThesisModel from '../model/Thesis'
import ThesisController from '../controller/Thesis'

import initThesis from './thesisRoutes/initThesis'
import confirmRole from './thesisRoutes/confirmRole'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)
thesisRouter.put('/confirm-role', confirmRole)

export default thesisRouter
