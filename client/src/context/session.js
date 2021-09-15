import React, { createContext, useReducer } from "react"
import { initialState, reducer, actions } from '../store/session'


export const SessionContext = createContext({})

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    student: state.student,
    saveStudent: (student) => {
      dispatch({ type: actions.SAVE_STUDENT, payload: { student } })
    }
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}