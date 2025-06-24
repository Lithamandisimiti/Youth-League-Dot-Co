import { api, fetch, queryString, authenticate, nodeHost } from '../actions';
import { secretKey } from '../../../constants';
import { AES } from 'crypto-js';

//Actions
export const SET_REGISTER = 'SET_REGISTER';
export const SET_REGISTER_PENDING = 'SET_REGISTER_PENDING';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';
export const SET_REGISTER_FAILURE = 'SET_REGISTER_FAILURE';

export const SET_VALIDATE_USERNAME = 'SET_VALIDATE_USERNAME';
export const SET_VALIDATE_USERNAME_PENDING = 'SET_VALIDATE_USERNAME_PENDING';
export const SET_VALIDATE_USERNAME_SUCCESS = 'SET_VALIDATE_USERNAME_SUCCESS';
export const SET_VALIDATE_USERNAME_ERROR = 'SET_VALIDATE_USERNAME_ERROR';
export const SET_VALIDATE_USERNAME_FAILURE = 'SET_VALIDATE_USERNAME_FAILURE';

export const SET_VALIDATE_EMAIL = 'SET_VALIDATE_EMAIL';
export const SET_VALIDATE_EMAIL_PENDING = 'SET_VALIDATE_EMAIL_PENDING';
export const SET_VALIDATE_EMAIL_SUCCESS = 'SET_VALIDATE_EMAIL_SUCCESS';
export const SET_VALIDATE_EMAIL_ERROR = 'SET_VALIDATE_EMAIL_ERROR';
export const SET_VALIDATE_EMAIL_FAILURE = 'SET_VALIDATE_EMAIL_FAILURE';

function setRegister(Register) {
  return { type: SET_REGISTER, Register };
}

function setRegisterPending(isRegisterPending) {
  return { type: SET_REGISTER_PENDING, isRegisterPending };
}

function setRegisterSuccess(isRegisterSuccess) {
  return { type: SET_REGISTER_SUCCESS, isRegisterSuccess };
}

function setRegisterError(RegisterError) {
  return { type: SET_REGISTER_ERROR, RegisterError };
}

function setRegisterFailure(RegisterFailure) {
  return { type: SET_REGISTER_FAILURE, RegisterFailure };
}

function setValidateUsername(username) {
  return { type: SET_VALIDATE_USERNAME, username };
}

function setValidateUsernamePending(usernamePending) {
  return { type: SET_VALIDATE_USERNAME_PENDING, usernamePending };
}

function setValidateUsernameSuccess(usernameSuccess) {
  return { type: SET_VALIDATE_USERNAME_SUCCESS, usernameSuccess };
}

function setValidateUsernameError(usernameError) {
  return { type: SET_VALIDATE_USERNAME_ERROR, usernameError };
}

function setValidateUsernameFailure(usernameFailure) {
  return { type: SET_VALIDATE_USERNAME_FAILURE, usernameFailure };
}

function setValidateEmail(email) {
  return { type: SET_VALIDATE_EMAIL, email };
}

function setValidateEmailPending(emailPending) {
  return { type: SET_VALIDATE_EMAIL_PENDING, emailPending };
}

function setValidateEmailSuccess(emailSuccess) {
  return { type: SET_VALIDATE_EMAIL_SUCCESS, emailSuccess };
}

function setValidateEmailError(emailError) {
  return { type: SET_VALIDATE_EMAIL_ERROR, emailError };
}

function setValidateEmailFailure(emailFailure) {
  return { type: SET_VALIDATE_EMAIL_FAILURE, emailFailure };
}

export function register(data) {
  return (dispatch, getState) => {
    dispatch(setRegister(null));
    dispatch(setRegisterPending(true));
    dispatch(setRegisterSuccess(false));
    dispatch(setRegisterError(null));
    dispatch(setRegisterFailure(null));
    const cipherpassword = AES.encrypt(data.password, secretKey);
    data.password = cipherpassword.toString();

    fetch(nodeHost + '/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setRegisterPending(false));

        if (response.status === 200) {
          const { id, username, image, token } = response.result;
          dispatch(setRegister(response));
          dispatch(setRegisterSuccess(true));
          dispatch(authenticate(id, username, image, token));
        } else {
          dispatch(setRegisterFailure(response));
        }
      })
      .catch(error => {
        dispatch(setRegisterFailure(error));
        console.error(error);
      });
  };
}

export function validateUsername(username) {
  return (dispatch, getState) => {
    dispatch(setValidateUsername(null));
    dispatch(setValidateUsernamePending(true));
    dispatch(setValidateUsernameSuccess(false));
    dispatch(setValidateUsernameError(null));
    dispatch(setValidateUsernameFailure(null));

    fetch(nodeHost + '/api/auth/username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(username),
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setValidateUsernamePending(false));
        dispatch(setValidateUsernameSuccess(true));
        if (res.status === 406) {
          dispatch(setValidateUsername(res));
        } else if (res.status !== 200) {
          dispatch(setValidateUsernameError('Server error'));
        }
      })
      .catch(error => {
        dispatch(setValidateUsernameFailure(error));
        console.error(error);
      });
  };
}

export function validateEmail(email) {
  return (dispatch, getState) => {
    dispatch(setValidateEmail(null));
    dispatch(setValidateEmailPending(true));
    dispatch(setValidateEmailSuccess(false));
    dispatch(setValidateEmailError(null));
    dispatch(setValidateEmailFailure(null));
    // fetch(nodeHost + '/api/mailer/sendMail',
    // {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: queryString.stringify({
    //         mailType:"validate_email",
    //         email:email.email
    //     })
    // })
    // .then(res=>res.json())
    // .then(res=>{
    // if (res.status === 200) {
    fetch(nodeHost + '/api/auth/validate-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(email),
    })
      .then(res => res.json())
      .then(res => {
        dispatch(setValidateEmailPending(false));
        dispatch(setValidateEmailSuccess(true));
        if (res.status === 406) {
          dispatch(setValidateEmail(res));
        } else if (res.status !== 200) {
          dispatch(setValidateEmailError('Server error'));
        }
      })
      .catch(error => {
        dispatch(setValidateEmailFailure(error));
        console.error(error);
      });
  };
}
