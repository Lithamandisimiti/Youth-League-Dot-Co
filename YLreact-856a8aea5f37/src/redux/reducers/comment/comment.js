import { 
	SET_COMMENTS, SET_COMMENTS_PENDING, SET_COMMENTS_SUCCESS, SET_COMMENTS_ERROR, SET_COMMENTS_FAILURE,
}  from '../../actions/comment/comment';

export function comments(state = {
		comments: null,
		isCommentsSuccess: false,
		isCommentsPending: false,
		commentsError: null,
		commentsFailure: null
	}, action ) {
	switch (action.type) {
		case SET_COMMENTS:
			return Object.assign({}, state, {
				comments: action.comments
			});

		case SET_COMMENTS_PENDING:
			return Object.assign({}, state, {
				isCommentsPending: action.isCommentsPending
			});

		case SET_COMMENTS_SUCCESS:
			return Object.assign({}, state, {
				isCommentsSuccess: action.isCommentsSuccess
			});

		case SET_COMMENTS_ERROR:
			return Object.assign({}, state, {
				commentsError: action.commentsError
			});

		case SET_COMMENTS_FAILURE:
			return Object.assign({}, state, {
				commentsFailure: action.commentsFailure
			});


		default:
			return state;
	}
}