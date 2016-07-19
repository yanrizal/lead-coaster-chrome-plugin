const storage = localStorage.getItem('user');
const initialState = {
  token: JSON.parse(storage).token || null,
  user: {}
};

export function auth(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'OAUTH_SUCCESS':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user
      });
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}

export function isLog(state = {}, action){
  switch (action.type) {
    case 'IS_LOGIN':
      return action.value
    default:
      return state;
  }
}