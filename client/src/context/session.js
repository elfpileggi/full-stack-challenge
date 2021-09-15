import React, { createContext, useReducer } from "react"
import { initialState, reducer, actions } from '../store/session'


export const SessionContext = createContext({})

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    student: state.student,
    staff: state.staff,
    skill: state.skill,
    setStudent: (student) => {
      dispatch({ type: actions.SAVE_STUDENT, payload: { student } })
    },
    setStaff: (staff) => {
      dispatch({ type: actions.SAVE_STAFF, payload: { staff } })
    },
    setSkill: (skill) => {
      dispatch({ type: actions.SAVE_STAFF, payload: { skill } })
    },
    cleanSession: () => {
      dispatch({ type: actions.CLEAN })
    }
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}