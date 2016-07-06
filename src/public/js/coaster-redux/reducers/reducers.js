import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { UPDATE_LOCATION } from 'react-router-redux';
import messages from './message';
import postsByApi from './postsByApi'
import { auth, isLog } from './auth';

const rootReducer = combineReducers({
  isLog,
  postsByApi,
  routing: routeReducer,
  messages,
  auth
});

export default rootReducer;
