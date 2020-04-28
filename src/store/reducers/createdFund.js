import * as actionTypes from '../actions/actionTypes'

const initialState = {
  name: '',
  description: '',
  lockValue: null,
  icon: '',
  coverImage: ''
}

const setFund = (state, actionPayload) => {
  // remove keys with undefined value
  Object.keys(actionPayload).forEach(key => {
    if (actionPayload[key] === undefined) {
      delete actionPayload[key]
    }
  })

  return { ...state, ...actionPayload }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FUND:
      return setFund(state, action.payload)
    default:
      return state
  }
}

export default reducer
