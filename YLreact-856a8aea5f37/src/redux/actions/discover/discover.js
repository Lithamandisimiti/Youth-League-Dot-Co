import { fetch, queryString, nodeHost } from '../actions';

//search users
export const SET_DISCOVER = 'SET_DISCOVER';
export const SET_DISCOVER_PENDING = 'SET_DISCOVER_PENDING';
export const SET_DISCOVER_SUCCESS = 'SET_DISCOVER_SUCCESS';
export const SET_DISCOVER_ERROR = 'SET_DISCOVER_ERROR';
export const SET_DISCOVER_FAILURE = 'SET_DISCOVER_FAILURE';

function setDiscover(discover) {
  return { type: SET_DISCOVER, discover };
}

function setDiscoverPending(isDiscoverPending) {
  return { type: SET_DISCOVER_PENDING, isDiscoverPending };
}

function setDiscoverSuccess(isDiscoverSuccess) {
  return { type: SET_DISCOVER_SUCCESS, isDiscoverSuccess };
}

function setDiscoverError(discoverError) {
  return { type: SET_DISCOVER_ERROR, discoverError };
}

function setDiscoverFailure(discoverFailure) {
  return { type: SET_DISCOVER_FAILURE, discoverFailure };
}

export function discover() {
  let id = localStorage.getItem('userId');
  return (dispatch, getState) => {
    dispatch(setDiscover(null));
    dispatch(setDiscoverPending(true));
    dispatch(setDiscoverSuccess(false));
    dispatch(setDiscoverError(null));
    dispatch(setDiscoverFailure(null));

    fetch(`${nodeHost}/api/users/discover/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setDiscoverPending(false));
        if (response.length !== 0) {
          dispatch(setDiscover(response));
          dispatch(setDiscoverSuccess(true));
        } else {
          let message = new Error('No results found');
          dispatch(setDiscoverError(message));
        }
      })
      .catch(error => dispatch(setDiscoverFailure(error)));
  };
}
