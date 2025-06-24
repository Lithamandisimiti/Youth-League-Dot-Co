import { 
	SET_GALLERY, SET_GALLERY_PENDING, SET_GALLERY_SUCCESS, SET_GALLERY_ERROR, SET_GALLERY_FAILURE,
}  from '../../actions/gallery/gallery';

export function gallery(state = {
		gallery: null,
		isGallerySuccess: false,
		isGalleryPending: false,
		galleryError: null,
		galleryFailure: null
	}, action ) {
	switch (action.type) {
		case SET_GALLERY:
			return Object.assign({}, state, {
				gallery: action.gallery
			});

		case SET_GALLERY_PENDING:
			return Object.assign({}, state, {
				isGalleryPending: action.isGalleryPending
			});

		case SET_GALLERY_SUCCESS:
			return Object.assign({}, state, {
				isGallerySuccess: action.isGallerySuccess
			});

		case SET_GALLERY_ERROR:
			return Object.assign({}, state, {
				galleryError: action.galleryError
			});

		case SET_GALLERY_FAILURE:
			return Object.assign({}, state, {
				galleryFailure: action.galleryFailure
			});


		default:
			return state;
	}
}