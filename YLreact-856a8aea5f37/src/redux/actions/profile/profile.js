import { api, fetch, queryString, nodeHost } from '../actions';

//get categories
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_PENDING = 'SET_PROFILE_PENDING';
export const SET_PROFILE_SUCCESS = 'SET_PROFILE_SUCCESS';
export const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR';
export const SET_PROFILE_FAILURE = 'SET_PROFILE_FAILURE';
export const SET_PROFILE_UPDATE_PENDING = 'SET_PROFILE_UPDATE_PENDING';
export const SET_PROFILE_UPDATE_FAILURE = 'SET_PROFILE_UPDATE_FAILURE';

export const SET_PROFILE_BASIC_UPDATE_PENDING =
  'SET_PROFILE_BASIC_UPDATE_PENDING';
export const SET_PROFILE_BASIC_UPDATE_SUCCESS =
  'SET_PROFILE_BASIC_UPDATE_SUCCESS';
export const SET_PROFILE_BASIC_UPDATE_FAILURE =
  'SET_PROFILE_BASIC_UPDATE_FAILURE';
export const SET_PROFILE_BASIC_UPDATE_ERROR = 'SET_PROFILE_BASIC_UPDATE_ERROR';

export const SET_PROFILE_WORK_UPDATE_PENDING =
  'SET_PROFILE_WORK_UPDATE_PENDING';
export const SET_PROFILE_WORK_UPDATE_SUCCESS =
  'SET_PROFILE_WORK_UPDATE_SUCCESS';
export const SET_PROFILE_WORK_UPDATE_FAILURE =
  'SET_PROFILE_WORK_UPDATE_FAILURE';
export const SET_PROFILE_WORK_UPDATE_ERROR = 'SET_PROFILE_WORK_UPDATE_ERROR';

export const SET_PROFILE_FOLLOWERS = 'SET_PROFILE_FOLLOWERS_reducer';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE_reducer';
export const SET_PROFILE_FOLLOWING = 'SET_PROFILE_FOLLOWING_reducinator';

function setProfile(profile) {
  return { type: SET_PROFILE, profile };
}

function setProfilePending(isProfilePending) {
  return { type: SET_PROFILE_PENDING, isProfilePending };
}

function setProfileUpdatePending(isProfileUpdatePending) {
  return { type: SET_PROFILE_UPDATE_PENDING, isProfileUpdatePending };
}
function setProfileSuccess(isProfileSuccess) {
  return { type: SET_PROFILE_SUCCESS, isProfileSuccess };
}

function setProfileError(profileError) {
  return { type: SET_PROFILE_ERROR, profileError };
}

export function setUserImage(image) {
  return { type: SET_PROFILE_IMAGE, image };
}

function setProfileFailure(profileFailure) {
  return { type: SET_PROFILE_FAILURE, profileFailure };
}

function setProfileFollowers(followers) {
  return { type: SET_PROFILE_FOLLOWERS, followers };
}
function setProfileFollowing(following) {
  return { type: SET_PROFILE_FOLLOWING, following };
}

export function profile(username) {
  return (dispatch, getState) => {
    dispatch(setProfilePending(true));
    dispatch(setProfileSuccess(false));
    dispatch(setProfileError(null));
    dispatch(setProfileFailure(null));
    dispatch(setProfile(null));
    if (getState().authenticate.isLoggedIn) {
      const id = localStorage.getItem('userId');
      const data = {
        id: id,
        username: username,
      };
      fetch(api + 'api/user-data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          dispatch(setProfilePending(false));
          //alert(response == '');
          if (response && response.length > 0) {
            dispatch(setProfile(response));
            dispatch(setProfileSuccess(true));
            const follData = { id: response[0].id };
            fetch(api + 'api/count-followers.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: queryString.stringify(follData),
            })
              .then(r => r.json())
              .then(response => {
                dispatch(setProfileFollowers(response[0].followers));
              });
            fetch(api + 'api/count-following.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: queryString.stringify(follData),
            })
              .then(r => r.json())
              .then(response => {
                dispatch(setProfileFollowing(response[0].following));
              });
          } else if (response.length === 0) {
            const message = new Error('User not found');
            dispatch(setProfileError(message));
          } else {
            const message = new Error('response.message');
            dispatch(setProfileError(message));
          }
        })
        .catch(error => dispatch(setProfileFailure(error)));
    }
  };
}

export function updateUserData(newData) {
  return (dispatch, getState) => {
    dispatch(setProfileUpdatePending(true));
    const id = localStorage.getItem('userId');
    fetch(nodeHost + `/api/users/change-user-data/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
      body: queryString.stringify(newData),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(setProfileUpdatePending(false));
        if (response.status === 200) {
          dispatch(setProfile([{ ...newData, id }]));
        }
      });
  };
}

function setProfileBasicUpdateSuccess(isProfileBasicUpdateSuccess) {
  return {
    type: SET_PROFILE_BASIC_UPDATE_SUCCESS,
    isProfileBasicUpdateSuccess,
  };
}

function setProfileBasicUpdatePending(isProfileBasicUpdatePending) {
  return {
    type: SET_PROFILE_BASIC_UPDATE_PENDING,
    isProfileBasicUpdatePending,
  };
}

function setProfileBasicUpdateFailure(isProfileBasicUpdateFailure) {
  return {
    type: SET_PROFILE_BASIC_UPDATE_FAILURE,
    isProfileBasicUpdateFailure,
  };
}

function setProfileBasicUpdateError(profileBasicUpdateError) {
  return { type: SET_PROFILE_BASIC_UPDATE_ERROR, profileBasicUpdateError };
}

export function profileBasicUpdate(profileData) {
  return (dispatch, getState) => {
    dispatch(setProfileBasicUpdateSuccess(false));
    dispatch(setProfileBasicUpdatePending(true));
    dispatch(setProfileBasicUpdateFailure(false));
    dispatch(setProfileBasicUpdateError(null));

    const id = localStorage.getItem('userId');
    const data = {
      id: id,
      ...profileData,
    };

    fetch(api + 'api/update-user-basic.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(r => r.json())
      .then(response => {
        if (!!response && response === true) {
          dispatch(setProfileBasicUpdateSuccess(true));
          dispatch(setProfile([profileData]));
        } else {
          dispatch(setProfileBasicUpdateFailure(true));
        }
      })
      .catch(err => {
        dispatch(setProfileBasicUpdateFailure(true));
        dispatch(setProfileBasicUpdateError(err));
      })
      .finally(() => {
        dispatch(setProfileBasicUpdatePending(false));
      });
  };
}

function setProfileWorkUpdateSuccess(isProfileWorkUpdateSuccess) {
  return { type: SET_PROFILE_WORK_UPDATE_SUCCESS, isProfileWorkUpdateSuccess };
}

function setProfileWorkUpdatePending(isProfileWorkUpdatePending) {
  return { type: SET_PROFILE_WORK_UPDATE_PENDING, isProfileWorkUpdatePending };
}

function setProfileWorkUpdateFailure(isProfileWorkUpdateFailure) {
  return { type: SET_PROFILE_WORK_UPDATE_FAILURE, isProfileWorkUpdateFailure };
}

function setProfileWorkUpdateError(profileWorkUpdateError) {
  return { type: SET_PROFILE_WORK_UPDATE_ERROR, profileWorkUpdateError };
}

export function profileWorkUpdate(profileData) {
  return (dispatch, getState) => {
    dispatch(setProfileWorkUpdateSuccess(false));
    dispatch(setProfileWorkUpdatePending(true));
    dispatch(setProfileWorkUpdateFailure(false));
    dispatch(setProfileWorkUpdateError(null));

    const id = localStorage.getItem('userId');
    const data = {
      id: id,
      ...profileData,
    };

    fetch(api + 'api/update-user-work.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(r => r.json())
      .then(response => {
        if (!!response && response === true) {
          dispatch(setProfileWorkUpdateSuccess(true));
          dispatch(setProfile([profileData]));
        } else {
          dispatch(setProfileWorkUpdateFailure(true));
        }
      })
      .catch(err => {
        dispatch(setProfileWorkUpdateFailure(true));
        dispatch(setProfileWorkUpdateError(err));
      })
      .finally(() => {
        dispatch(setProfileWorkUpdatePending(false));
      });
  };
}
