import { api, fetch, queryString, nodeHost } from '../actions';

export const SET_BLOCK_SUCCESS = 'SET_BLOCK_SUCCESS';
export const SET_BLOCK_PENDING = 'SET_BLOCK_PENDING';
export const SET_BLOCK_FAILURE = 'SET_BLOCK_FAILURE';

export const SET_UNBLOCK_SUCCESS = 'SET_UNBLOCK_SUCCESS';
export const SET_UNBLOCK_PENDING = 'SET_BLOCK_PENDING';
export const SET_UNBLOCK_FAILURE = 'SET_UNBLOCK_FAILURE';

export const SET_GET_USERS_SUCCESS = 'SET_GET_USERS_SUCCESS';
export const SET_GET_USERS_PENDING = 'SET_GET_USERS_PENDING';
export const SET_GET_USERS_FAILURE = 'SET_FGET_USERS_FAILURE';

/**
 * Returns the succesful state from the block api
 *
 * @param {*} result
 * @returns
 */
function setBlockSuccess(result) {
  return { type: SET_BLOCK_SUCCESS, result };
}

/**
 * Returns the pending state of the block api
 *
 * @param {*} isPending
 * @returns
 */
function setBlockPending(isPending) {
  return { type: SET_BLOCK_PENDING, isPending };
}

/**
 * Returns the failure state of the block api
 *
 * @param {*} result
 * @returns
 */
function setBlockFailure(result) {
  return { type: SET_BLOCK_FAILURE, result };
}

/**
 * Returns a successful state of the unblock api
 *
 * @param {*} result
 * @returns
 */
function setUnblockSuccess(result) {
  return { type: SET_UNBLOCK_SUCCESS, result };
}

/**
 * Returns the pending state of the unblock api
 *
 * @param {*} result
 * @returns
 */
function setUnblockPending(result) {
  return { type: SET_UNBLOCK_PENDING, result };
}

/**
 * Returns the failure state of the unblock api
 * @param {*} result
 * @returns
 */
function setUnblockFailure(result) {
  return { type: SET_UNBLOCK_FAILURE, result };
}

/**
 * Returns the pending state of  the get users api
 *
 * @param {*} isPending
 * @returns
 */
function setGetUsersPending(isPending) {
  return { type: SET_GET_USERS_SUCCESS, isPending };
}

/**
 * Returns the success state of the get users api
 *
 * @param {*} result
 * @returns
 */
function setGetUsersSuccess(result) {
  return { type: SET_GET_USERS_SUCCESS, result };
}

/**
 * Returns the failure state of the get users api
 *
 * @param {*} result
 * @returns
 */
function setGetUsersFailure(result) {
  return { type: SET_GET_USERS_FAILURE, result };
}

/**
 * POST api that blocks a user given their id
 *
 * @export
 * @param {*} blockId
 * @returns
 */
export function block(blockId) {
  const data = {
    id: localStorage.getItem('userId'),
    block_id: blockId,
  };

  return dispatch => {
    dispatch(setBlockSuccess(null));
    dispatch(setBlockPending(true));
    dispatch(setBlockFailure(null));

    fetch(api + 'api/block.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(setBlockPending(false));
        if (response === true) {
          dispatch(setBlockSuccess(response));
        } else {
          dispatch(setBlockFailure(response));
        }
      })
      .catch(error => {
        console.error({ error });
        dispatch(setBlockFailure(error));
      });
  };
}

/**
 * POST api that unblocks a user given their id
 *
 * @export
 * @param {*} blockId
 * @returns
 */
export function unBlock(blockId) {
  const data = {
    id: localStorage.getItem('userId'),
    block_id: blockId,
  };

  return dispatch => {
    dispatch(setUnblockSuccess(null));
    dispatch(setUnblockPending(true));
    dispatch(setUnblockFailure(null));

    fetch(api + 'api/unblock.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        dispatch(setUnblockPending(false));
        if (response === true) {
          dispatch(setUnblockSuccess(response));
        } else {
          dispatch(setUnblockFailure(response));
        }
      })
      .catch(error => {
        console.error({ error });
        dispatch(setUnblockFailure(error));
      });
  };
}

/**
 * GET api that fetches all the followers who are blocked and not blocked
 *
 * @export
 * @returns
 */
export function getUsers() {
  const userId = localStorage.getItem('userId');

  return dispatch => {
    dispatch(setGetUsersSuccess([]));
    dispatch(setGetUsersPending(true));
    dispatch(setGetUsersFailure(null));

    fetch(`${nodeHost}/api/users/get-blocked-users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Token ${localStorage.getItem('userToken')}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setGetUsersPending(false));
        if (response.status === 200) {
          dispatch(setGetUsersSuccess(response.result));
        } else {
          dispatch(setGetUsersFailure(response.result));
        }
      })
      .catch(error => {
        console.error({ error });
        dispatch(setGetUsersFailure(error));
      });
  };
}
