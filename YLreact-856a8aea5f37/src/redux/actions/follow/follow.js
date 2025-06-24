import { api, fetch, queryString } from '../actions';

//follow users
export const SET_FOLLOW = 'SET_FOLLOW';
export const SET_FOLLOW_PENDING = 'SET_FOLLOW_PENDING';
export const SET_FOLLOW_SUCCESS = 'SET_FOLLOW_SUCCESS';
export const SET_FOLLOW_ERROR = 'SET_FOLLOW_ERROR';
export const SET_FOLLOW_FAILURE = 'SET_FOLLOW_FAILURE';

function setFollow(follow) {
  return { type: SET_FOLLOW, follow };
}

function setFollowPending(isFollowPending) {
  return { type: SET_FOLLOW_PENDING, isFollowPending };
}

function setFollowSuccess(isFollowSuccess) {
  return { type: SET_FOLLOW_SUCCESS, isFollowSuccess };
}

function setFollowError(followError) {
  return { type: SET_FOLLOW_ERROR, followError };
}

function setFollowFailure(followFailure) {
  return { type: SET_FOLLOW_FAILURE, followFailure };
}

//get user following
export const SET_FOLLOWING = 'SET_FOLLOWING';
export const SET_FOLLOWING_PENDING = 'SET_FOLLOWING_PENDING';
export const SET_FOLLOWING_SUCCESS = 'SET_FOLLOWING_SUCCESS';
export const SET_FOLLOWING_ERROR = 'SET_FOLLOWING_ERROR';
export const SET_FOLLOWING_FAILURE = 'SET_FOLLOWING_FAILURE';

function setFollowing(following) {
  return { type: SET_FOLLOWING, following };
}

function setFollowingPending(isFollowingPending) {
  return { type: SET_FOLLOWING_PENDING, isFollowingPending };
}

function setFollowingSuccess(isFollowingSuccess) {
  return { type: SET_FOLLOWING_SUCCESS, isFollowingSuccess };
}

function setFollowingError(followError) {
  return { type: SET_FOLLOWING_ERROR, followError };
}

function setFollowingFailure(followFailure) {
  return { type: SET_FOLLOWING_FAILURE, followFailure };
}

export function following(id) {
  const data = {
    id: id,
  };
  return (dispatch, getState) => {
    dispatch(setFollowing(null));
    dispatch(setFollowingPending(true));
    dispatch(setFollowingSuccess(false));
    dispatch(setFollowingError(null));
    dispatch(setFollowingFailure(null));

    fetch(api + 'api/get-following.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setFollowingPending(false));
        //alert(response);
        if (response.length !== 0) {
          dispatch(setFollowing(response));
          dispatch(setFollowingSuccess(true));
        } else {
          const message = new Error('No results found');
          dispatch(setFollowingError(message));
        }
      })
      .catch(error => dispatch(setFollowingFailure(error)));
  };
}

//get user followers
export const SET_FOLLOWERS = 'SET_FOLLOWERS';
export const SET_FOLLOWERS_PENDING = 'SET_FOLLOWERS_PENDING';
export const SET_FOLLOWERS_SUCCESS = 'SET_FOLLOWERS_SUCCESS';
export const SET_FOLLOWERS_ERROR = 'SET_FOLLOWERS_ERROR';
export const SET_FOLLOWERS_FAILURE = 'SET_FOLLOWERS_FAILURE';

function setFollowers(followers) {
  return { type: SET_FOLLOWERS, followers };
}

function setFollowersPending(isFollowersPending) {
  return { type: SET_FOLLOWERS_PENDING, isFollowersPending };
}

function setFollowersSuccess(isFollowersSuccess) {
  return { type: SET_FOLLOWERS_SUCCESS, isFollowersSuccess };
}

function setFollowersError(followersError) {
  return { type: SET_FOLLOWERS_ERROR, followersError };
}

function setFollowersFailure(followersFailure) {
  return { type: SET_FOLLOWERS_FAILURE, followersFailure };
}

export function followers(id) {
  const data = {
    id: id,
  };
  return (dispatch, getState) => {
    dispatch(setFollowers(null));
    dispatch(setFollowersPending(true));
    dispatch(setFollowersSuccess(false));
    dispatch(setFollowersError(null));
    dispatch(setFollowersFailure(null));

    fetch(api + 'api/get-followers.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setFollowersPending(false));
        //alert(response);
        if (response.length !== 0) {
          dispatch(setFollowers(response));
          dispatch(setFollowersSuccess(true));
        } else {
          const message = new Error('No results found');
          dispatch(setFollowersError(message));
        }
      })
      .catch(error => dispatch(setFollowersFailure(error)));
  };
}

export function follow(term, isFollow) {
  const data = {
    id: localStorage.getItem('userId'),
    follow_id: term,
  };
  const php = isFollow ? 'api/follow.php' : 'api/unfollow.php';

  return (dispatch, getState) => {
    dispatch(setFollow(null));
    dispatch(setFollowPending(true));
    dispatch(setFollowSuccess(false));
    dispatch(setFollowError(null));
    dispatch(setFollowFailure(null));

    fetch(api + php, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      // .then(response => response.json())
      .then(response => {
        dispatch(setFollowPending(false));
        //alert(response);
        if (response.length !== 0) {
          dispatch(setFollow(response));
          dispatch(setFollowSuccess(true));
        } else {
          const message = new Error('No results found');
          dispatch(setFollowError(message));
        }
      })
      .catch(error => dispatch(setFollowFailure(error)));
  };
}
