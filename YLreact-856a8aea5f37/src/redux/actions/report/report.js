import { fetch, queryString, nodeHost } from '../actions';

export const SET_REPORT_SUCCESS = 'SET_REPORT_SUCCESS';
export const SET_REPORT_PENDING = 'SET_REPORT_PENDING';
export const SET_REPORT_FAILURE = 'SET_REPORT_FAILURE';

/**
 * Sets loading state of report action
 *
 * @param {*} isPending
 * @returns
 */
function setReportPending(isPending) {
  return { type: SET_REPORT_PENDING, isPending };
}

/**
 * Sets success state of report action
 * @param {*} isSuccess
 * @returns
 */
function setReportSuccess(isSuccess) {
  return { type: SET_REPORT_SUCCESS, isSuccess };
}

/**
 * Sets  failure state of report action
 *
 * @param {*} results
 * @returns
 */
function setReportFailure(results) {
  return { type: SET_REPORT_FAILURE, results };
}

/**
 * Posts subject and message to .../api/users/feedback/
 *
 * @export
 * @param {string} subject
 * @param {string} message
 * @returns
 */
export function report(subject, message) {
  const userId = localStorage.getItem('userId');
  const userToken = localStorage.getItem('userToken');
  return dispatch => {
    dispatch(setReportPending(false));
    dispatch(setReportSuccess(false));
    dispatch(setReportFailure(null));
    fetch(nodeHost + `/api/users/feedback/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Token ${userToken}`,
      },
      body: queryString.stringify({ subject, body: message }),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setReportPending(false));
        if (response.status === 200) {
          dispatch(setReportSuccess(true));
        } else {
          dispatch(setReportFailure(response.result));
        }
      })
      .catch(error => dispatch(setReportFailure(error)));
  };
}

/**
 * Resets the state of the report action
 *
 * @export
 * @returns
 */
export function clearState() {
  return dispatch => {
    dispatch(setReportPending(false));
    dispatch(setReportSuccess(false));
    dispatch(setReportFailure(null));
  };
}
