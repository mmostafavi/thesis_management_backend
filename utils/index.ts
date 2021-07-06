// validator and checker functions
import checkAvailabilityInstructor from './checkAvailabilityInstructor'
import checkAvailabilityStudent from './checkAvailabilityStudent'
import checkAvailabilityThesis from './checkAvailabilityThesis'
import initThesisChecks from './initThesisChecks'
import confirmRoleChecks from './confirmRoleChecks'
import setTitleChecks from './setTitleChecks'
import { populate } from './populate'
import confirmTitleChecks from './confirmTitleChecks'
import confirmThesisChecks from './confrimThesisChecks'
import setRefereesChecks from './setRefereesChecks'
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
      // checks associated with confirm title resolver
      return confirmThesisChecks(data)
      // ------------------------------------------------------------
    } else if (type === 'set_referees_checks') {
      // ------------------------------------------------------------
      // checks associated with set Referees resolver
      return setRefereesChecks(data)
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
