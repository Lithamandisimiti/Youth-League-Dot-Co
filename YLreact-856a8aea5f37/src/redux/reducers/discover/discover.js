import { 
	SET_DISCOVER, SET_DISCOVER_PENDING, SET_DISCOVER_SUCCESS, SET_DISCOVER_ERROR, SET_DISCOVER_FAILURE,
}  from '../../actions/discover/discover';

export function discover(state = {
		discover: null,
		isDiscoverSuccess: false,
		isDiscoverPending: false,
		discoverError: null,
		discoverFailure: null
	}, action ) {
	switch (action.type) {
		case SET_DISCOVER:
			return Object.assign({}, state, {
				discover: action.discover
			});

		case SET_DISCOVER_PENDING:
			return Object.assign({}, state, {
				isDiscoverPending: action.isDiscoverPending
			});

		case SET_DISCOVER_SUCCESS:
			return Object.assign({}, state, {
				isDiscoverSuccess: action.isDiscoverSuccess
			});

		case SET_DISCOVER_ERROR:
			return Object.assign({}, state, {
				discoverError: action.discoverError
			});

		case SET_DISCOVER_FAILURE:
			return Object.assign({}, state, {
				discoverFailure: action.discoverFailure
			});


		default:
			return state;
	}
}