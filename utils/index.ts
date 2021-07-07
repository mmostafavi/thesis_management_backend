// validator and checker functions
import checkAvailabilityInstructor from './checkAvailabilityInstructor'
import checkAvailabilityStudent from './checkAvailabilityStudent'
import checkAvailabilityThesis from './checkAvailabilityThesis'
import initThesisChecks from './initThesisChecks'
import confirmRoleChecks from './confirmRoleChecks'
import setTitleChecks from './setTitleChecks'
import { populate } from './populate'
import confirmTitleChecks from './confirmTitleChecks'
import confirmThesisChecks from './confirmThesisChecks'
import setRefereesChecks from './setRefereesChecks'
import setDefenceDateChecks from './setDefenceDateChecks'
import refereeConfirmationChecks from './refereeConfirmationChecks'
import submitScoreChecks from './submitScoreChecks'
import updateTitleChecks from './updateTitleChecks'
import getThesisChecks from './getThesisChecks'
export const checkAvailability: any = (payload: any) => {
  try {
    const { type, data } = payload

    if (type === 'instructor') {
      // -----------------------------------------------------------------
      // checks  whether an instructor with given username exists or not
      return checkAvailabilityInstructor(data)
      // -----------------------------------------------------------------
    } else if (type === 'student') {
      // -------------------------------------------------------------
      // checks whether a student with given username exists or not
      return checkAvailabilityStudent(data)
      // -------------------------------------------------------------
    } else if (type === 'thesis') {
      // ----------------------------------------------------
      // checks whether a thesis with given id exists or not
      return checkAvailabilityThesis(data)
      // ----------------------------------------------------
    } else if (type === 'init_thesis_checks') {
      // ----------------------------------------------------
      // checks associated with init thesis resolver
      return initThesisChecks(data)
      // ----------------------------------------------------
    } else if (type === 'confirm_role_checks') {
      // ----------------------------------------------------
      // checks associated with confirm role resolver
      return confirmRoleChecks(data)
      // ----------------------------------------------------
    } else if (type === 'set_title_checks') {
      // ------------------------------------------------------------
      // checks associated with set title resolver
      return setTitleChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'confirm_title_checks') {
      // ------------------------------------------------------------
      // checks associated with confirm title resolver
      return confirmTitleChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'confirm_thesis_checks') {
      // ------------------------------------------------------------
      // checks associated with confirm thesis resolver
      return confirmThesisChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'set_referees_checks') {
      // ------------------------------------------------------------
      // checks associated with set Referees resolver
      return setRefereesChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'set_defence_date_checks') {
      // ------------------------------------------------------------
      // checks associated with set defence date resolver
      return setDefenceDateChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'referee_confirmation_checks') {
      // ------------------------------------------------------------
      // checks associated with referee confirmation resolver
      return refereeConfirmationChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'submit_score_checks') {
      // ------------------------------------------------------------
      // checks associated with submit score resolver
      return submitScoreChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'update_title_checks') {
      // ------------------------------------------------------------
      // checks associated with update title resolver
      return updateTitleChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'get_thesis_checks') {
      // ------------------------------------------------------------
      // checks associated with get thesis resolver
      return getThesisChecks(data)
      // ------------------------------------------------------------
    }

    return {
      exists: false,
      message: 'validator or checker is not defined',
      result: {},
    }
  } catch (error) {
    throw error
  }
}

export { populate }
