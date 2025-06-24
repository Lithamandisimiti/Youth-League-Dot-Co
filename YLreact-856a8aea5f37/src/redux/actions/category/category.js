//import fetch from 'isomorphic-fetch';
//import queryString from 'query-string';
//import cookie from 'react-cookie';
//import { browserHistory } from 'react-router';

import { api, fetch, queryString } from '../actions';

//get categories
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CATEGORY_PENDING = 'SET_CATEGORY_PENDING';
export const SET_CATEGORY_SUCCESS = 'SET_CATEGORY_SUCCESS';
export const SET_CATEGORY_ERROR = 'SET_CATEGORY_ERROR';
export const SET_CATEGORY_FAILURE = 'SET_CATEGORY_FAILURE';

function setCategory(category) {
    return { type: SET_CATEGORY, category }
}

function setCategoryPending(isCategoryPending) {
    return { type: SET_CATEGORY_PENDING, isCategoryPending }
}

function setCategorySuccess(isCategorySuccess) {
    return { type: SET_CATEGORY_SUCCESS, isCategorySuccess }
}

function setCategoryError(categoryError) {
    return { type: SET_CATEGORY_ERROR, categoryError }
}

function setCategoryFailure(categoryFailure) {
    return { type: SET_CATEGORY_FAILURE, categoryFailure }
}

export function category(id) {
    let data = {id: id};
    return (dispatch, getState) => {
        dispatch(setCategory(null));
        dispatch(setCategoryPending(true));
        dispatch(setCategorySuccess(false));
        dispatch(setCategoryError(null));
        dispatch(setCategoryFailure(null))

        fetch(api + 'api/get-categories.php',
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
                    dispatch(setCategoryPending(false));
                    //alert(response);
                    if (response !== []) {
                        dispatch(setCategory(response));
                        dispatch(setCategorySuccess(true));
                    }else{
                        let message = new Error(response.message);
                        dispatch(setCategoryError(message));
                    }
                }
            )
            .catch(error => dispatch(setCategoryFailure(error))); 
    };
}