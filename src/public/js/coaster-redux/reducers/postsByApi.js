import { REQUEST_POSTS, RECEIVE_POSTS, IS_LOGIN } from '../actions/actions';

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  meta:{},
  status: false}, action) {
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
        items:items,
        status: action.status,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

export function postsByApi(state = {}, action) {
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