import {
  SET_REPORT_FAILURE,
  SET_REPORT_PENDING,
  SET_REPORT_SUCCESS,
} from '../../actions/report/report';

/**
 * Returns the current state of the report action
 *
 * @export
 * @param {object} [state={
 *     isSuccess: false,
 *     isPending: false,
 *     reportFailure: null,
 *   }]
 * @param {string} action
 * @returns
 */
export function report(
  state = {
    isSuccess: false,
    isPending: false,
    reportFailure: null,
  },
  action,
) {
  switch (action.type) {
    case SET_REPORT_PENDING:
      return Object.assign({}, state, {
        isPending: action.isPending,
      });

    case SET_REPORT_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: action.isSuccess,
      });

    case SET_REPORT_FAILURE:
      return Object.assign({}, state, {
        reportFailure: action.reportFailure,
      });

    default:
      return state;
  }
}
