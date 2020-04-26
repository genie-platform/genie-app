import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: null,
  userId: null,
  name: null,
  imageUrl: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const signInSuccess = (state, action) => {
  return {
    token: action.idToken,
    userId: action.userId,
    name: action.name,
    imageUrl: action.imageUrl,
    error: null,
    loading: false
  }
}

const signOut = (state, action) => {
  return initialState
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return signInSuccess(state, action)
    case actionTypes.AUTH_SIGNOUT:
      return signOut(state, action)
    default:
      return state
  }
}

export default reducer
