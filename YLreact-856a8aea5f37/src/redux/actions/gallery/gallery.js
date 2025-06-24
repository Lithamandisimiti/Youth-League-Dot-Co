import { api, fetch, queryString } from '../actions';

//get categories
export const SET_GALLERY = 'SET_GALLERY';
export const SET_GALLERY_PENDING = 'SET_GALLERY_PENDING';
export const SET_GALLERY_SUCCESS = 'SET_GALLERY_SUCCESS';
export const SET_GALLERY_ERROR = 'SET_GALLERY_ERROR';
export const SET_GALLERY_FAILURE = 'SET_GALLERY_FAILURE';

function setGallery(gallery) {
    return { type: SET_GALLERY, gallery }
}

function setGalleryPending(isGalleryPending) {
    return { type: SET_GALLERY_PENDING, isGalleryPending }
}

function setGallerySuccess(isGallerySuccess) {
    return { type: SET_GALLERY_SUCCESS, isGallerySuccess }
}

function setGalleryError(galleryError) {
    return { type: SET_GALLERY_ERROR, galleryError }
}

function setGalleryFailure(galleryFailure) {
    return { type: SET_GALLERY_FAILURE, galleryFailure }
}

export function gallery(id) {
    let data = {
        id: id,
        from: 0,
        limit: 10
    };
    return (dispatch, getState) => {
        dispatch(setGallery(null));
        dispatch(setGalleryPending(true));
        dispatch(setGallerySuccess(false));
        dispatch(setGalleryError(null));
        dispatch(setGalleryFailure(null));
        fetch(api + 'api/get-images.php',
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
                    dispatch(setGalleryPending(false));
                    //alert(response);
                    if (response) {
                        dispatch(setGallery(response));
                        dispatch(setGallerySuccess(true));
                    }else{
                        let message = new Error(response.message);
                        dispatch(setGalleryError(message));
                    }
                }
            )
            .catch(error => dispatch(setGalleryFailure(error))); 
    };
}