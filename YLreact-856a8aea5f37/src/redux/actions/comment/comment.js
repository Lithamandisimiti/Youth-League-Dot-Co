import { api, fetch, queryString, authenticate, initNotifications } from '../actions';

//get categories
export const SET_COMMENTS = 'SET_COMMENTS';
export const SET_COMMENTS_PENDING = 'SET_COMMENTS_PENDING';
export const SET_COMMENTS_SUCCESS = 'SET_COMMENTS_SUCCESS';
export const SET_COMMENTS_ERROR = 'SET_COMMENTS_ERROR';
export const SET_COMMENTS_FAILURE = 'SET_COMMENTS_FAILURE';

function setComments(comments) {
    return { type: SET_COMMENTS, comments }
}

function setCommentsPending(isCommentPending) {
    return { type: SET_COMMENTS_PENDING, isCommentPending }
}

function setCommentsSuccess(isCommentSuccess) {
    return { type: SET_COMMENTS_SUCCESS, isCommentSuccess }
}

function setCommentsError(commentsError) {
    return { type: SET_COMMENTS_ERROR, commentsError }
}

function setCommentsFailure(commentsFailure) {
    return { type: SET_COMMENTS_FAILURE, commentsFailure }
}

export function comments(post_id, fromC, limit) {
    let data = {
        post_id: post_id,
        from: fromC,
        limit: limit
    };
    return (dispatch, getState) => {
        dispatch(setComments(null));
        dispatch(setCommentsPending(true));
        dispatch(setCommentsSuccess(false));
        dispatch(setCommentsError(null));
        dispatch(setCommentsFailure(null));
        fetch(api + 'api/get-comments.php',
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
                    dispatch(setCommentsPending(false));
                    //alert(response);
                    if (response.length != 0) {
                        dispatch(setComments(response));
                        dispatch(setCommentsSuccess(true));
                        dispatch(authenticate(response[0].id, response[0].username))
                        dispatch(initNotifications())
                    }else{
                        let message = new Error('incorrect email or password');
                        dispatch(setCommentsError(message));
                    }
                }
            )
            .catch(error => dispatch(setCommentsFailure(error))); 
    };
}