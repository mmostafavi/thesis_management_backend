const express = require('express')

import initThesis from './thesisRoutes/initThesis'
import confirmRole from './thesisRoutes/confirmRole'
import setTitle from './thesisRoutes/setTitle'
import confirmTitle from './thesisRoutes/confirmTitle'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)
thesisRouter.post('/confirm-role', confirmRole)
thesisRouter.put('/set-title', setTitle)
thesisRouter.post('/confirm-title', confirmTitle)

export default thesisRouter
