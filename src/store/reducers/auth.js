import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  name: null,
  imageUrl: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
  address: null,
};

const signInSuccess = (state, action) => {
  return {
    token: action.token,
    userId: action.userId,
    name: action.name,
    imageUrl: action.imageUrl,
    error: null,
    loading: false,
    address: state.address,
  };
};

const signOut = (state, action) => {
  return initialState;
};

const walletConnected = (state, action) => {
  return { ...state, address: action.address };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return signInSuccess(state, action);
    case actionTypes.AUTH_SIGNOUT:
      return signOut(state, action);
    case actionTypes.WALLET_CONNECTED:
      return walletConnected(state, action);
    default:
      return state;
  }
};

export default reducer;
