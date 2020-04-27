import * as actionTypes from '../actions/actionTypes'

const initialState = {
  name: '',
  description: '',
  lockValue: null
}

const setFund = (state, action) => {
  return {
    ...state,
    name: action.name,
    description: action.description,
    lockValue: action.lockValue
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FUND:
      return setFund(state, action)
    default:
      return state
  }
}

export default reducer
