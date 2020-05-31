import * as actionTypes from '../actions/actionTypes';

// ONLY FOR DEMO PURPOSES
// TODO DELETE AFTER HACKATHON
const initialState = {
  name: 'Path of Exile Demo Pool',
  description: 'This is a Demo pool for the hack.money 2020 hackathon.',
  lockValue: 5,
  icon: '🧙‍♂️',
  coverImage: '/images/cover4.jpg',
  winnerDescription: '',
  rewardDuration: null,
  game: 'Path of Exile',
  winningCondition: { type: 'level', value: 2 },
};

// const initialState = {
//   name: '',
//   description: '',
//   lockValue: 5,
//   icon: '🧞',
//   coverImage: '',
//   winnerDescription: '',
//   rewardDuration: null,
//   game: null,
//   winningCondition: { type: '', value: 100 },
// };

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
