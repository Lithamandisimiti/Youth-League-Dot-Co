import {
	SET_REGISTER, SET_REGISTER_PENDING, SET_REGISTER_SUCCESS, SET_REGISTER_ERROR, SET_REGISTER_FAILURE,
	SET_VALIDATE_EMAIL, SET_VALIDATE_EMAIL_ERROR, SET_VALIDATE_EMAIL_FAILURE, SET_VALIDATE_EMAIL_PENDING, SET_VALIDATE_EMAIL_SUCCESS,
	SET_VALIDATE_USERNAME, SET_VALIDATE_USERNAME_ERROR, SET_VALIDATE_USERNAME_FAILURE, SET_VALIDATE_USERNAME_PENDING, SET_VALIDATE_USERNAME_SUCCESS
} from '../../actions/register/register'

export function register(state = {
		register: null,
		isRegisterSuccess: false,
		isRegisterPending: false,
		registerError: null,
		registerFailure: null
	}, action ) {
	switch (action.type) {
		case SET_REGISTER:
			return Object.assign({}, state, {
				register: action.register
			});

		case SET_REGISTER_PENDING:
			return Object.assign({}, state, {
				isRegisterPending: action.isRegisterPending
			});

		case SET_REGISTER_SUCCESS:
			return Object.assign({}, state, {
				isRegisterSuccess: action.isRegisterSuccess
			});

		case SET_REGISTER_ERROR:
			return Object.assign({}, state, {
				registerError: action.RegisterError
			});

		case SET_REGISTER_FAILURE:
			return Object.assign({}, state, {
				registerFailure: action.RegisterFailure
			});


		default:
			return state;
	}
}

export function validateUsername(state = {
	username: null,
	isUsernameSuccess: false,
	isUsernamePending: false,
	usernameError: null,
	usernameFailure: null
}, action ) {
	switch (action.type) {
		case SET_VALIDATE_USERNAME:
			return Object.assign({}, state, {
				username: action.username
			});

		case SET_VALIDATE_USERNAME_PENDING:
			return Object.assign({}, state, {
				isUsernamePending: action.usernamePending
			});

		case SET_VALIDATE_USERNAME_SUCCESS:
			return Object.assign({}, state, {
				isUsernameSuccess: action.usernameSuccess
			});

		case SET_VALIDATE_USERNAME_ERROR:
			return Object.assign({}, state, {
				usernameError: action.usernameError
			});

		case SET_VALIDATE_USERNAME_FAILURE:
			return Object.assign({}, state, {
				usernameFailure: action.usernameFailure
			});


		default:
			return state;
	}
}

export function validateEmail(state = {
	email: null,
	isEmailSuccess: false,
	isEmailPending: false,
	emailError: null,
	emailFailure: null
}, action ) {
	switch (action.type) {
		case SET_VALIDATE_EMAIL:
			return Object.assign({}, state, {
				email: action.email
			});

		case SET_VALIDATE_EMAIL_PENDING:
			return Object.assign({}, state, {
				isEmailPending: action.emailPending
			});

		case SET_VALIDATE_EMAIL_SUCCESS:
			return Object.assign({}, state, {
				isEmailSuccess: action.emailSuccess
			});

		case SET_VALIDATE_EMAIL_ERROR:
			return Object.assign({}, state, {
				emailError: action.emailError
			});

		case SET_VALIDATE_EMAIL_FAILURE:
			return Object.assign({}, state, {
				emailFailure: action.emailFailure
			});


		default:
			return state;
	}
}
