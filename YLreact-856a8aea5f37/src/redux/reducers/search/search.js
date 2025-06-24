import { 
	SET_SEARCH, SET_SEARCH_PENDING, SET_SEARCH_SUCCESS, SET_SEARCH_ERROR, SET_SEARCH_FAILURE,
}  from '../../actions/search/search';

export function search(state = {
		search: null,
		isSearchSuccess: false,
		isSearchPending: false,
		searchError: null,
		searchFailure: null
	}, action ) {
	switch (action.type) {
		case SET_SEARCH:
			return Object.assign({}, state, {
				search: action.search
			});

		case SET_SEARCH_PENDING:
			return Object.assign({}, state, {
				isSearchPending: action.isSearchPending
			});

		case SET_SEARCH_SUCCESS:
			return Object.assign({}, state, {
				isSearchSuccess: action.isSearchSuccess
			});

		case SET_SEARCH_ERROR:
			return Object.assign({}, state, {
				searchError: action.searchError
			});

		case SET_SEARCH_FAILURE:
			return Object.assign({}, state, {
				searchFailure: action.searchFailure
			});


		default:
			return state;
	}
}