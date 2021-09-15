export const initialState = {
  student: {},
  staff: {},
  skill: {}
}

export const actions = {
  SAVE_STUDENT: 'SAVE_STUDENT',
  SAVE_STAFF: 'SAVE_STAFF',
  SAVE_SKILL: 'SAVE_SKILL',
  CLEAN: 'CLEAN',
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.SAVE_STUDENT:
    case actions.SAVE_STAFF:
    case actions.SAVE_SKILL:
      return {
        ...state,
        ...action.payload
      }
    case actions.CLEAN:
      return initialState
    default:
      return state
  }
}