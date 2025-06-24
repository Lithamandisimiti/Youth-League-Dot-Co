import { api, fetch, queryString, nodeHost } from '../actions';

export const SET_EMAIL_PENDING = 'SET_EMAIL_PENDING';
export const SET_EMAIL_SUCCESS = 'SET_EMAIL_SUCCESS';
export const SET_EMAIL_ERROR = 'SET_EMAIL_ERROR';
export const SET_EMAIL_RESET = 'SET_EMAIL_RESET';

function setEmailPending(isEmailPending) {
  return { type: SET_EMAIL_PENDING, isEmailPending };
}

function setEmailSuccess(isEmailSuccess) {
  return { type: SET_EMAIL_SUCCESS, isEmailSuccess };
}

function setEmailError(emailError) {
  return { type: SET_EMAIL_ERROR, emailError };
}

function setEmailReset() {
  return { type: SET_EMAIL_RESET };
}

export function sendEmail(email) {
  const data = { email };

  return (dispatch, getState) => {
    dispatch(setEmailPending(true));
    dispatch(setEmailSuccess(null));
    dispatch(setEmailError(null));

    fetch(nodeHost + '/api/auth/forgot-password-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setEmailPending(false));
        if (response.status === 200) {
          dispatch(setEmailSuccess(true));
        } else {
          dispatch(setEmailError(response.msg));
        }
      })
      .catch(error => dispatch(setEmailError(error)));
  };
}

export const resetEmailReducer = () => {
  return dispatch => dispatch(setEmailReset());
};
