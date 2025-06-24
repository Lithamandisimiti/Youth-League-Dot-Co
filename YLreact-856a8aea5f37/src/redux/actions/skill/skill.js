import { api, fetch, queryString } from '../actions';

//get categories
export const SET_PROFILE = 'SET_PROFILE';
export const SET_PROFILE_PENDING = 'SET_PROFILE_PENDING';
export const SET_PROFILE_SUCCESS = 'SET_PROFILE_SUCCESS';
export const SET_PROFILE_ERROR = 'SET_PROFILE_ERROR';
export const SET_PROFILE_FAILURE = 'SET_PROFILE_FAILURE';

function setProfile(profile) {
    return { type: SET_PROFILE, profile }
}

function setProfilePending(isProfilePending) {
    return { type: SET_PROFILE_PENDING, isProfilePending }
}

function setProfileSuccess(isProfileSuccess) {
    return { type: SET_PROFILE_SUCCESS, isProfileSuccess }
}

function setProfileError(profileError) {
    return { type: SET_PROFILE_ERROR, profileError }
}

function setProfileFailure(profileFailure) {
    return { type: SET_PROFILE_FAILURE, profileFailure }
}

export function profile(id) {
    let data = {
        id: id,
        username: 'tj'
    };
    return (dispatch, getState) => {
        dispatch(setProfile(null));
        dispatch(setProfilePending(true));
        dispatch(setProfileSuccess(false));
        dispatch(setProfileError(null));
        dispatch(setProfileFailure(null));
        fetch(api + 'api/user-data.php',
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
                    dispatch(setProfilePending(false));
                    //alert(response);
                    if (response.length !== 0) {
                        dispatch(setProfile(response));
                        dispatch(setProfileSuccess(true));
                    }else{
                        let message = new Error(response.message);
                        dispatch(setProfileError(message));
                    }
                }
            )
            .catch(error => dispatch(setProfileFailure(error))); 
    };
}