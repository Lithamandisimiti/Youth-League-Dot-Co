import {
	SET_POSTS,
	SET_POSTS_PENDING,
	SET_POSTS_SUCCESS,
	SET_POSTS_ERROR,
	SET_POSTS_FAILURE,
	LIKE_POST_PENDING,
	LIKE_POST_SUCCESS,
	LIKE_POST_FAILURE,
	UNLIKE_POST_PENDING,
	UNLIKE_POST_SUCCESS,
	UNLIKE_POST_FAILURE
}  from '../../actions/post/post';

export function posts(state = {
		posts: null,
		isPostsSuccess: false,
		isPostsPending: false,
		postsError: null,
		postsFailure: null,
		likePostSuccess: false,
		likePostPending: false,
		likePostFailure: null,
		unlikePostSuccess: false,
		unlikePostPending: false,
		unlikePostFailure: null,
		isOpenModal:false
	}, action ) {
	switch (action.type) {
		case SET_POSTS:
			return Object.assign({}, state, {
				posts: action.posts
			});

		case SET_POSTS_PENDING:
			return Object.assign({}, state, {
				isPostsPending: action.isPostsPending
			});

		case SET_POSTS_SUCCESS:
			return Object.assign({}, state, {
				isPostsSuccess: action.isPostsSuccess
			});

		case SET_POSTS_ERROR:
			return Object.assign({}, state, {
				postsError: action.postsError
			});

		case SET_POSTS_FAILURE:
			return Object.assign({}, state, {
				postsFailure: action.postsFailure
			});

		case LIKE_POST_PENDING:
			return Object.assign({}, state, {
				likePostPending: action.likePostPending
			});

		case LIKE_POST_SUCCESS:
			return Object.assign({}, state, {
				likePostSuccess: action.likePostSuccess
			});

		case LIKE_POST_FAILURE:
			return Object.assign({}, state, {
				likePostFailure: action.likePostFailure
			});

		case UNLIKE_POST_PENDING:
			return Object.assign({}, state, {
				unlikePostPending: action.unlikePostPending
			});

		case UNLIKE_POST_SUCCESS:
			return Object.assign({}, state, {
				unlikePostSuccess: action.unlikePostSuccess
			});

		case UNLIKE_POST_FAILURE:
			return Object.assign({}, state, {
				unlikePostFailure: action.unlikePostFailure
			});
		default:
			return state;
	}
}
