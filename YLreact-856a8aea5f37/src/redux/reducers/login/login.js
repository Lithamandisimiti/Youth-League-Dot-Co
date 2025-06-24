import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SET_LOGIN_FAILURE,
} from '../../actions/login/login';

export function login(
  state = {
    login: null,
    isLoginSuccess: false,
    isLoginPending: false,
    loginFailure: null,
  },
  action
) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending,
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess,
      });

    case SET_LOGIN_FAILURE:
      return Object.assign({}, state, {
        loginFailure: action.loginFailure,
      });

    default:
      return state;
  }
}
