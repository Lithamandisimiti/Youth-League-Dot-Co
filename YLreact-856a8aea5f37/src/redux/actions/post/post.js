//import fetch from 'isomorphic-fetch';
//import queryString from 'query-string';
//import cookie from 'react-cookie';
//import { browserHistory } from 'react-router';

import { api, fetch, queryString, nodeHost } from '../actions';
import { sendNotification } from '../notification/notification';

import { PostTypes } from '../../../helpers/constants';

//get categories
export const SET_POSTS = 'SET_POSTS';
export const SET_POSTS_PENDING = 'SET_POSTS_PENDING';
export const SET_POSTS_SUCCESS = 'SET_POSTS_SUCCESS';
export const SET_POSTS_ERROR = 'SET_POSTS_ERROR';
export const SET_POSTS_FAILURE = 'SET_POSTS_FAILURE';

export const LIKE_POST_PENDING = 'LIKE_POST_PENDING';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';
export const UNLIKE_POST_PENDING = 'UNLIKE_POST_PENDING';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

function setPosts(posts) {
  return { type: SET_POSTS, posts };
}
function setPostsPending(isPostsPending) {
  return { type: SET_POSTS_PENDING, isPostsPending };
}
function setPostsSuccess(isPostsSuccess) {
  return { type: SET_POSTS_SUCCESS, isPostsSuccess };
}
function setPostsError(postsError) {
  return { type: SET_POSTS_ERROR, postsError };
}
function setPostsFailure(postsFailure) {
  return { type: SET_POSTS_FAILURE, postsFailure };
}

function likePostPending(likePostPending) {
  return { type: LIKE_POST_PENDING, likePostPending };
}
function likePostSuccess(likePostSuccess) {
  return { type: LIKE_POST_SUCCESS, likePostSuccess };
}
function likePostFailure(likePostFailure) {
  return { type: LIKE_POST_FAILURE, likePostFailure };
}
function unlikePostPending(unlikePostPending) {
  return { type: UNLIKE_POST_PENDING, unlikePostPending };
}
function unlikePostSuccess(unlikePostSuccess) {
  return { type: UNLIKE_POST_SUCCESS, unlikePostSuccess };
}
function unlikePostFailure(unlikePostFailure) {
  return { type: UNLIKE_POST_FAILURE, unlikePostFailure };
}

export function posts(postType = PostTypes.HOT, username = '') {
  return (dispatch, getState) => {
    dispatch(setPostsPending(true));
    dispatch(setPostsSuccess(false));
    dispatch(setPostsError(null));
    dispatch(setPostsFailure(null));
    dispatch(setPosts(null));
    let source = '';
    const id = getState().authenticate.userId || -1;
    switch (postType) {
      case PostTypes.ALL:
        source = 'get-posts.php';
        break;
      case PostTypes.CATEGORY:
        source = 'get-category-posts.php';
        break;
      case PostTypes.USER:
        source = 'get-user-posts.php';
        break;
      case PostTypes.HOT:
        source = 'get-hot-posts.php';
        break;
      default:
        source = 'get-posts.php';
        break;
    }
    // if (url === 0) source = 'get-posts.php';
    // if (url === 1) source = 'get-user-posts.php';
    // if (url === 2) source = "get-category-posts.php";

    const data = {
      id,
      username: username,
      category: username,
      from: 0,
      limit: 100,
    };

    fetch(api + 'api/' + source, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setPostsPending(false));
        if (Array.isArray(response)) {
          dispatch(setPosts(response));
          dispatch(setPostsSuccess(true));
        } else {
          const message = new Error(response.message);
          dispatch(setPostsError(message));
        }
      })
      .catch(error => dispatch(setPostsFailure(error)));
  };
}

export function likePost(post) {
  const link = 'api/like.php';
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      dispatch(likePostPending(false));
      dispatch(likePostSuccess(true));
      dispatch(sendNotification('like', post.user_id, post.post_id, post.type));
    }
  };
}

export function unlikePost(post) {
  const link = 'api/unlike.php';
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      dispatch(unlikePostPending(false));
      dispatch(unlikePostSuccess(true));
    }
  };
}
