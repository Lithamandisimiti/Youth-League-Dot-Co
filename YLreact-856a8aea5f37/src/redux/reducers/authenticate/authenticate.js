import {
  USER_LOGGED_IN,
  SET_LOGOUT,
} from '../../actions/authenticate/authenticate';

export function authenticate(
  state = {
    isLoggedIn: localStorage.getItem('userToken') ? true : false,
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('userToken'),
    userName: localStorage.getItem('userName'),
    userProfileImage: localStorage.getItem('userProfileImage'),
  },
  action,
) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        userProfileImage: action.userProfileImage,
      });

    case SET_LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn,
        token: action.token,
        userId: action.userId,
        userName: action.userName,
        userProfileImage: action.userProfileImage,
      });

    default:
      return state;
  }
}
