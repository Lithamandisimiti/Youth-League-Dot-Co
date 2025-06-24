import { 
	SET_FOLLOWING, SET_FOLLOWING_PENDING, SET_FOLLOWING_SUCCESS, SET_FOLLOWING_ERROR, SET_FOLLOWING_FAILURE,
	SET_FOLLOWERS, SET_FOLLOWERS_PENDING, SET_FOLLOWERS_SUCCESS, SET_FOLLOWERS_ERROR, SET_FOLLOWERS_FAILURE,
}  from '../../actions/follow/follow';

export function following(state = {
		following: null,
		isFollowingSuccess: false,
		isFollowingPending: false,
		followingError: null,
		followingFailure: null
	}, action ) {
	switch (action.type) {
		case SET_FOLLOWING:
			return Object.assign({}, state, {
				following: action.following
			});

		case SET_FOLLOWING_PENDING:
			return Object.assign({}, state, {
				isFollowingPending: action.isFollowingPending
			});

		case SET_FOLLOWING_SUCCESS:
			return Object.assign({}, state, {
				isFollowingSuccess: action.isFollowingSuccess
			});

		case SET_FOLLOWING_ERROR:
			return Object.assign({}, state, {
				followingError: action.followingError
			});

		case SET_FOLLOWING_FAILURE:
			return Object.assign({}, state, {
				followingFailure: action.followingFailure
			});

		default:
			return state;
	}
}

export function followers(state = {
		followers: null,
		isFollowersSuccess: false,
		isFollowersPending: false,
		followersError: null,
		followersFailure: null
	}, action ) {
	switch (action.type) {
		case SET_FOLLOWERS:
			return Object.assign({}, state, {
				followers: action.followers
			});

		case SET_FOLLOWERS_PENDING:
			return Object.assign({}, state, {
				isFollowersPending: action.isFollowersPending
			});

		case SET_FOLLOWERS_SUCCESS:
			return Object.assign({}, state, {
				isFollowersSuccess: action.isFollowersSuccess
			});

		case SET_FOLLOWERS_ERROR:
			return Object.assign({}, state, {
				followersError: action.followersError
			});

		case SET_FOLLOWERS_FAILURE:
			return Object.assign({}, state, {
				followersFailure: action.followersFailure
			});

		default:
			return state;
	}
}