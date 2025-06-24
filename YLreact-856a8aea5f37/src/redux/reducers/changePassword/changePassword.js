import {
    SET_CHANGE_PASSWORD_ERROR, SET_CHANGE_PASSWORD_FAILURE, SET_CHANGE_PASSWORD_PENDING, SET_CHANGE_PASSWORD_SUCCESS
} from '../../actions/changePassword/changePassword';

export function changePassword(state = {
    isChangePasswordSuccess: false,
    isChangePasswordPending: false,
    changePasswordError: null,
    changePasswordFailure: null
}, action ) {
switch (action.type) {
    // case SET_CATEGORY:
    //     return Object.assign({}, state, {
    //         category: action.category
    //     });

    case SET_CHANGE_PASSWORD_PENDING:
        return Object.assign({}, state, {
            isChangePasswordPending: action.isChangePasswordPending
        });

    case SET_CHANGE_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isChangePasswordSuccess: action.isChangePasswordSuccess
        });

    case SET_CHANGE_PASSWORD_ERROR:
        return Object.assign({}, state, {
            changePasswordError: action.changePasswordError
        });

    case SET_CHANGE_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            changePasswordFailure: action.changePasswordFailure
        });


    default:
        return state;
}
}