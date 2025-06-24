import {
	SET_POSTING,
	OPEN_POSTING_MODAL,
	SET_POSTING_BLOG,
	SET_POSTED_BLOG,
	OPEN_NAV_POSTING_MODAL,
	OPEN_PROFILE_MODAL
}  from '../../actions/upload/upload';

export function uploads(state = {
        isOpenModal:false,
        isOpenNavModal:false,
        isOpenProfileModal:false,
        isPosting:false,
        isPostingBlog:false,
        isPostedBlog:false
	}, action ) {
	switch (action.type) {
		case OPEN_POSTING_MODAL:
			return Object.assign({}, state, {
				isOpenModal: action.isOpen
			});
		case OPEN_NAV_POSTING_MODAL:
			return Object.assign({}, state, {
				isOpenNavModal: action.isOpen
			});

		case OPEN_PROFILE_MODAL:
			return Object.assign({}, state, {
				isOpenProfileModal: action.isOpen
			});
		case SET_POSTING:
			return Object.assign({}, state, {
				isPosting: action.payload
			});

		case SET_POSTING_BLOG:
			return Object.assign({}, state, {
				isPostingBlog: action.payload
			});

		case SET_POSTED_BLOG:
			return Object.assign({}, state, {
				isPostedBlog: action.payload
			});

		default:
			return state;
	}
}
