import {
    SET_CHANGE_PASSWORD_ERROR, SET_CHANGE_PASSWORD_PENDING, SET_CHANGE_PASSWORD_SUCCESS
} from '../../actions/forgotPassword/changePassword';

export function changePassword(state = {
    isChangePasswordSuccess: false,
    isChangePasswordPending: false,
    changePasswordError: null,
}, action ) {
switch (action.type) {
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

    default:
        return state;
}
}