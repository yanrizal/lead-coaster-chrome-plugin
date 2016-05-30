import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions/actions';
import { UPDATE_LOCATION } from 'react-router-redux';

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  status: false,
  meta: {
    total_rec: 0
  },
  total: 0,
  totalItem: 0 }, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        status: false,
      });
    case RECEIVE_POSTS:
      let meta = action.meta;
      let items = action.posts;
      if (action.status === false) {
        meta = {},
        items = [];
      }
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        meta: meta,
        status: action.status,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function postsByApi(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        data: posts(state[action.typePaid], action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByApi,
  routing: routeReducer,
  // selectedSearchType,
  // routing: routeReducer,
  // updateUrl
});

export default rootReducer;
