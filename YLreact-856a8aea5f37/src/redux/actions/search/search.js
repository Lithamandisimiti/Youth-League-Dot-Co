import { api, fetch, queryString } from '../actions';

//search users
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SEARCH_PENDING = 'SET_SEARCH_PENDING';
export const SET_SEARCH_SUCCESS = 'SET_SEARCH_SUCCESS';
export const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR';
export const SET_SEARCH_FAILURE = 'SET_SEARCH_FAILURE';

function setSearch(search) {
    return { type: SET_SEARCH, search }
}

function setSearchPending(isSearchPending) {
    return { type: SET_SEARCH_PENDING, isSearchPending }
}

function setSearchSuccess(isSearchSuccess) {
    return { type: SET_SEARCH_SUCCESS, isSearchSuccess }
}

function setSearchError(searchError) {
    return { type: SET_SEARCH_ERROR, searchError }
}

function setSearchFailure(searchFailure) {
    return { type: SET_SEARCH_FAILURE, searchFailure }
}

export function search(id, term) {
    let data = {
        id: id,
        search: term
    };
    return (dispatch, getState) => {
        dispatch(setSearch(null));
        dispatch(setSearchPending(true));
        dispatch(setSearchSuccess(false));
        dispatch(setSearchError(null));
        dispatch(setSearchFailure(null));

        fetch(api + 'api/search-users.php',
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: queryString.stringify(data)
        })
            .then(response => response.json())
            .then(
                response => {
                    dispatch(setSearchPending(false));
                    //alert(response);
                    if (response.length !== 0) {
                        dispatch(setSearch(response));
                        dispatch(setSearchSuccess(true));
                    }else{
                        let message = new Error('No results found');
                        dispatch(setSearchError(message));
                    }
                }
            )
            .catch(error => dispatch(setSearchFailure(error)));
    };
}