export default function messages(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'LINKEDIN_FORM_FAILURE':
    case 'ADD_COASTER_FAILURE':
    case 'DELETE_COASTER_FAILURE':
      return {
        error: action.messages
      };
    case 'POST_SUCCESS':
    case 'CHANGE_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
    case 'LINKEDIN_FORM_SUCCESS':
    case 'ADD_COASTER_SUCCESS':
      return {
        success: action.messages
      };
    case 'DELETE_COASTER_SUCCESS':
      return {
        deleted: action.messages
      };
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'UNLINK_SUCCESS':
      return {
        info: action.messages
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
