import { api, fetch, queryString } from '../actions';

//get events
export const SET_EVENTS = 'SET_EVENTS_reducer';
export const SET_EVENTS_LOADED = 'SET_EVENTS_LOADED_reducer';
export const SET_EVENTS_ERROR = 'SET_EVENTS_error_reducer';
export const SET_EVENTS_FAILURE = 'SET_EVENTS_fail_reducer';

function setEvents(events) {
  return { type: SET_EVENTS, events };
}
function setEventsLoaded(isLoadedEvents) {
  return { type: SET_EVENTS_LOADED, isLoadedEvents };
}
function setEventsError(message) {
  return { type: SET_EVENTS_ERROR, errorMessage: message };
}
function setEventsFailure(message) {
  return { type: SET_EVENTS_FAILURE, failureMessage: message };
}

export function events(id, from, limit) {
  const source = 'get-events.php';
  const data = {
    id,
    from,
    limit,
  };
  return (dispatch, getState) => {
    dispatch(setEvents(null));
    dispatch(setEventsLoaded(false));

    fetch(api + 'api/' + source, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setEventsLoaded(true));

        if (response.length >= 0) {
          dispatch(setEvents(response));
        } else {
          const message = new Error(response.message);
          dispatch(setEventsError(message));
        }
      })
      .catch(error => dispatch(setEventsFailure(error)));
  };
}
