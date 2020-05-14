import { createStore, combineReducers } from 'redux';

import authReducer from './reducers/auth';
import createdPoolReducer from './reducers/createdPool';

const rootReducer = combineReducers({
  auth: authReducer,
  createdPool: createdPoolReducer,
});

const preloadedState =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;

const store = createStore(rootReducer, preloadedState);

export default store;
