import { browserHistory } from 'react-router';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export function authenticate(userId, username, image, token) {
  return dispatch => {
    dispatch(userLoggedIn(true, userId, username, image, token));
  };
}

export function userLoggedIn(
  isLoggedIn,
  userId,
  userName,
  userProfileImage,
  token,
) {
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', userName);
  localStorage.setItem('userProfileImage', userProfileImage);
  localStorage.setItem('userToken', token);
  browserHistory.push('/');
  return {
    type: USER_LOGGED_IN,
    isLoggedIn,
    userId,
    token,
    userName,
    userProfileImage,
  };
}

export function unsetcookie() {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userProfileImage');
  localStorage.removeItem('userToken');
  return {
    type: SET_LOGOUT,
    isLoggedIn: false,
    userId: null,
    token: null,
    userName: null,
    userProfileImage: null,
  };
}

export const SET_LOGOUT = 'SET_LOGOUT';
export function logout() {
  return dispatch => {
    dispatch(unsetcookie(false));
  };
}
