import { api, fetch, queryString } from '../actions';

// export const SET_CHANGE_PASSWORD = 'SET_CHANGE_PASSWORD';
export const SET_CHANGE_PASSWORD_PENDING = 'SET_CHANGE_PASSWORD_PENDING';
export const SET_CHANGE_PASSWORD_SUCCESS = 'SET_CHANGE_PASSWORD_SUCCESS';
export const SET_CHANGE_PASSWORD_ERROR = 'SET_CHANGE_PASSWORD_ERROR';
export const SET_CHANGE_PASSWORD_FAILURE = 'SET_CHANGE_PASSWORD_FAILURE';

// function setChangePassword(password) {
//     return { type: SET_CHANGE_PASSWORD, password }
// }

function setChangePasswordPending(isChangePasswordPending) {
  return { type: SET_CHANGE_PASSWORD_PENDING, isChangePasswordPending };
}

function setChangePasswordSuccess(isChangePasswordSuccess) {
  return { type: SET_CHANGE_PASSWORD_SUCCESS, isChangePasswordSuccess };
}

function setChangePasswordError(passwordError) {
  return { type: SET_CHANGE_PASSWORD_ERROR, passwordError };
}

function setChangePasswordFailure(passwordFailure) {
  return { type: SET_CHANGE_PASSWORD_FAILURE, passwordFailure };
}

export function changePassword(id, oldPass, newPass) {
  const data = { id: id, oldPass: oldPass, newPass, newPass };
  return (dispatch, getState) => {
    // dispatch(setChangePassword(null));
    dispatch(setChangePasswordPending(true));
    dispatch(setChangePasswordSuccess(false));
    dispatch(setChangePasswordError(null));
    dispatch(setChangePasswordFailure(null));

    fetch(api + 'api/change-password.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      // .then(response => response.json())
      .then(response => {
        dispatch(setChangePasswordPending(false));
        alert(response);
        if (response === true || response === 'true') {
          // dispatch(setCategory(response));
          dispatch(setChangePasswordSuccess(true));
        } else {
          const message =
            'Could not change your password. Please try again or contact us for assistance';
          dispatch(setChangePasswordError(message));
        }
      })
      .catch(error => dispatch(setChangePasswordFailure(error)));
  };
}
