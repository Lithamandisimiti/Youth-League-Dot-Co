import {
  SET_BLOCK_FAILURE,
  SET_BLOCK_PENDING,
  SET_BLOCK_SUCCESS,
  SET_GET_USERS_FAILURE,
  SET_GET_USERS_PENDING,
  SET_GET_USERS_SUCCESS,
  SET_UNBLOCK_FAILURE,
  SET_UNBLOCK_PENDING,
  SET_UNBLOCK_SUCCESS,
} from '../../actions/block/block';

/**
 * Reducer that handles the response returned from the block user api
 *
 * @export
 * @param {boolean} [state={
 *     isBlockSuccess: null,
 *     isBlockFailure: null,
 *     isBlockPending: false,
 *   }]
 * @param {*} action
 * @returns
 */
export function block(
  state = {
    isBlockSuccess: null,
    isBlockFailure: null,
    isBlockPending: false,
  },
  action,
) {
  switch (action.type) {
    case SET_BLOCK_FAILURE:
      return Object.assign({}, state, {
        isBlockFailure: action.result,
      });

    case SET_BLOCK_PENDING:
      return Object.assign({}, state, {
        isBlockPending: action.isPending,
      });

    case SET_BLOCK_SUCCESS:
      return Object.assign({}, state, {
        isBlockSuccess: action.result,
      });
    default:
      return state;
  }
}

/**
 * Reducer that handles the response from the unblock user api
 *
 * @export
 * @param {boolean} [state={
 *     isUnblockSuccess: null,
 *     isUnblockFailure: null,
 *     isUnblockPending: false,
 *   }]
 * @param {*} action
 * @returns
 */
export function unBlock(
  state = {
    isUnblockSuccess: null,
    isUnblockFailure: null,
    isUnblockPending: false,
  },
  action,
) {
  switch (action.type) {
    case SET_UNBLOCK_FAILURE:
      return Object.assign({}, state, {
        isUnblockFailure: action.result,
      });

    case SET_UNBLOCK_PENDING:
      return Object.assign({}, state, {
        isUnblockPending: action.isPending,
      });

    case SET_UNBLOCK_SUCCESS:
      return Object.assign({}, state, {
        isUnblockSuccess: action.result,
      });
    default:
      return state;
  }
}

/**
 * Reducer handling the response returned from `/users/get-blocked-users/:id` api
 *
 * @export
 * @param {boolean} [state={
 *     getUsersSuccess: [],
 *     getUsersFailure: null,
 *     isGetUsersPending: false,
 *   }]
 * @param {*} action
 * @returns
 */
export function getUsers(
  state = {
    getUsersSuccess: [],
    getUsersFailure: null,
    isGetUsersPending: false,
  },
  action,
) {
  switch (action.type) {
    case SET_GET_USERS_FAILURE:
      return Object.assign({}, state, {
        getUsersFailure: action.result,
      });

    case SET_GET_USERS_PENDING:
      return Object.assign({}, state, {
        isGetUsersPending: action.isPending,
      });

    case SET_GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        getUsersSuccess: action.result,
      });
    default:
      return state;
  }
}
