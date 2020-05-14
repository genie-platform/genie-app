import * as actionTypes from '../actions/actionTypes';

const initialState = {
  web3: null,
};

const setWeb3 = (state, web3) => {
  return { web3: web3 };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WEB3:
      return setWeb3(state, action.web3);
    default:
      return state;
  }
};

export default reducer;
