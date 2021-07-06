const express = require('express')

import initThesis from './thesisRoutes/initThesis'
import confirmRole from './thesisRoutes/confirmRole'
import setTitle from './thesisRoutes/setTitle'
import confirmTitle from './thesisRoutes/confirmTitle'
import confirmThesis from './thesisRoutes/confirmThesis'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)
thesisRouter.post('/confirm-role', confirmRole)
thesisRouter.put('/set-title', setTitle)
thesisRouter.post('/confirm-title', confirmTitle)
thesisRouter.post('/confirm-thesis', confirmThesis)

export default thesisRouter
