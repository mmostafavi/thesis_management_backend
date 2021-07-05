const express = require('express')
import ThesisModel from '../model/Thesis'
import ThesisController from '../controller/Thesis'

import initThesis from './thesisRoutes/initThesis'
import confirmRole from './thesisRoutes/confirmRole'
import setTitle from './thesisRoutes/setTitle'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)
thesisRouter.put('/confirm-role', confirmRole)
thesisRouter.put('/set-title', setTitle)

export default thesisRouter
