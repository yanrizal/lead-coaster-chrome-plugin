export default function messages(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'LINKEDIN_FORM_FAILURE':
      return {
        error: action.messages
      };
    case 'UPDATE_PROFILE_SUCCESS':
    case 'CHANGE_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
    case 'CONTACT_FORM_SUCCESS':
    case 'LINKEDIN_FORM_SUCCESS':
      return {
        success: action.messages
      };
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'DELETE_ACCOUNT_SUCCESS':
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
