import { api, fetch, queryString, nodeHost } from '../actions';
import { secretKey } from '../../../constants';
import { AES } from 'crypto-js';

export const SET_CHANGE_PASSWORD_PENDING = 'SET_CHANGE_PASSWORD_PENDING';
export const SET_CHANGE_PASSWORD_SUCCESS = 'SET_CHANGE_PASSWORD_SUCCESS';
export const SET_CHANGE_PASSWORD_ERROR = 'SET_CHANGE_PASSWORD_ERROR';

function setChangePasswordPending(isChangePasswordPending) {
  return { type: SET_CHANGE_PASSWORD_PENDING, isChangePasswordPending };
}

function setChangePasswordSuccess(isChangePasswordSuccess) {
  return { type: SET_CHANGE_PASSWORD_SUCCESS, isChangePasswordSuccess };
}

function setChangePasswordError(changePasswordError) {
  return { type: SET_CHANGE_PASSWORD_ERROR, changePasswordError };
}

export function changePassword(password, key) {
  let cipherpassword = AES.encrypt(password, secretKey);
  const data = { password: cipherpassword.toString(), key };

  return (dispatch, getState) => {
    dispatch(setChangePasswordPending(true));
    dispatch(setChangePasswordSuccess(false));
    dispatch(setChangePasswordError(null));

    fetch(nodeHost + '/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setChangePasswordPending(false));
        if (response.status === 200) {
          dispatch(setChangePasswordSuccess(true));
        } else {
          let message =
            'Could not change your password. Please try again or contact us for assistance';
          dispatch(setChangePasswordError(message));
        }
      })
      .catch(error => dispatch(setChangePasswordError(error)));
  };
}
