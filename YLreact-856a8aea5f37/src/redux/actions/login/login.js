import {
  api,
  fetch,
  queryString,
  authenticate,
  initNotifications,
  nodeHost,
} from '../actions';
import { secretKey } from '../../../constants';
import { AES } from 'crypto-js';

export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGIN_PENDING = 'SET_LOGIN_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_LOGIN_FAILURE = 'SET_LOGIN_FAILURE';

function setLogin(login) {
  return { type: SET_LOGIN, login };
}

function setLoginPending(isLoginPending) {
  return { type: SET_LOGIN_PENDING, isLoginPending };
}

function setLoginSuccess(isLoginSuccess) {
  return { type: SET_LOGIN_SUCCESS, isLoginSuccess };
}

function setLoginFailure(loginFailure) {
  return { type: SET_LOGIN_FAILURE, loginFailure };
}

export function login(email, password) {
  const cipherpassword = AES.encrypt(password, secretKey);
  const data = {
    email_username: email,
    password: cipherpassword.toString(),
  };

  return (dispatch, getState) => {
    dispatch(setLogin(null));
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginFailure(null));
    fetch(nodeHost + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setLoginPending(false));
        if (response.status === 200) {
          const { id, username, image, token } = response.result;
          dispatch(setLoginSuccess(true));
          dispatch(authenticate(id, username, image, token));
          dispatch(initNotifications());
        } else {
          dispatch(setLoginFailure(response));
        }
      })
      .catch(error => dispatch(setLoginFailure(error)));
  };
}
