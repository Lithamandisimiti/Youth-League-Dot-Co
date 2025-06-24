import {
  SET_EMAIL_ERROR,
  SET_EMAIL_PENDING,
  SET_EMAIL_SUCCESS,
  SET_EMAIL_RESET,
} from '../../actions/forgotPassword/sendEmail';

export function sendEmail(
  state = {
    isEmailSuccess: false,
    isEmailPending: false,
    emailError: null,
  },
  action,
) {
  switch (action.type) {
    case SET_EMAIL_PENDING:
      return Object.assign({}, state, {
        isEmailPending: action.isEmailPending,
      });

    case SET_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        isEmailSuccess: action.isEmailSuccess,
      });

    case SET_EMAIL_ERROR:
      return Object.assign({}, state, {
        emailError: action.emailError,
      });
    case SET_EMAIL_RESET:
      return Object.assign({}, state, {
        isEmailSuccess: false,
        isEmailPending: false,
        emailError: null,
      });
    default:
      return state;
  }
}
