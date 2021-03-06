const express = require('express')

import initThesis from './thesisRoutes/initThesis'
import confirmRole from './thesisRoutes/confirmRole'
import setTitle from './thesisRoutes/setTitle'
import confirmTitle from './thesisRoutes/confirmTitle'
import confirmThesis from './thesisRoutes/confirmThesis'
import setReferees from './thesisRoutes/setReferees'
import setDefenceDate from './thesisRoutes/setDefenceDate'
import refereeConfirmation from './thesisRoutes/refereeConfirmation'
import submitScore from './thesisRoutes/submitScore'
import updateTitle from './thesisRoutes/updateTitle'
import getThesis from './thesisRoutes/getThesis'

const thesisRouter = express.Router()

thesisRouter.put('/init-thesis', initThesis)
thesisRouter.post('/confirm-role', confirmRole)
thesisRouter.put('/set-title', setTitle)
thesisRouter.post('/confirm-title', confirmTitle)
thesisRouter.post('/confirm-thesis', confirmThesis)
thesisRouter.put('/set-referees', setReferees)
thesisRouter.put('/set-defence-date', setDefenceDate)
thesisRouter.post('/referee-confirmation', refereeConfirmation)
thesisRouter.put('/submit-score', submitScore)
thesisRouter.put('/update-title', updateTitle)
thesisRouter.get('/get-thesis', getThesis)

export default thesisRouter
