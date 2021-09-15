export const initialState = {
  student: {}
}

export const actions = {
  SAVE_STUDENT: 'SAVE_STUDENT'
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SAVE_STUDENT:
      return {
        ...state,
        ...action.payload
      }  
    default:
      return state
  }
}