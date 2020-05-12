import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: '',
  description: '',
  lockValue: 5,
  icon: '🧞',
  coverImage: '',
  winnerDescription: '',
  rewardDuration: null,
};

const setPool = (state, actionPayload) => {
  // remove keys with undefined value
  Object.keys(actionPayload).forEach((key) => {
    if (actionPayload[key] === undefined) {
      delete actionPayload[key];
    }
  });

  return { ...state, ...actionPayload };
};

const resetPool = () => {
  return { ...initialState };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POOL:
      return setPool(state, action.payload);
    case actionTypes.RESET_POOL:
      return resetPool();
    default:
      return state;
  }
};

export default reducer;
