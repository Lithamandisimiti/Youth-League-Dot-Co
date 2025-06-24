import validator from 'validator';
import moment from 'moment';

/**
 * Validates the email input field
 *
 * @export
 * @param {string} value
 * @returns
 */
export function email(value) {
  if (!value) {
    return null;
  }
  if (validator.isEmpty(value))
    return { msg: 'The email address must not be empty.' };
  if (!validator.isEmail(value))
    return { msg: 'Please enter a valid email address.' };
  else if (!validator.isLength(value, { max: 250 }))
    return {
      error: true,
      msg: 'The email must be at a maximum 250 characters long.',
    };

  return null;
}

/**
 * Validates the password input field
 *
 * @export
 * @param {string} value
 * @param {string} rpassword
 * @returns
 */
export function password(value, rpassword) {
  if (!value) {
    return null;
  }
  if (validator.isEmpty(value))
    return { msg: 'The password field must not be empty.' };
  else if (!validator.isLength(value, { min: 6 }))
    return {
      error: true,
      msg: 'The password must be at a minimum 6 characters long.',
    };
  else if (rpassword && value !== rpassword)
    return { msg: 'Passwords do not match' };

  return null;
}

/**
 * Validates the passcode input field
 *
 * @export
 * @param {string} value
 * @returns
 */
export function passcode(value) {
  if (validator.isEmpty(value)) {
    return { msg: 'The passcode field must not be empty.' };
  } else if (!validator.isLength(value, { min: 5 })) {
    return { msg: 'The passcode must be at a minimum 5 characters long.' };
  }

  return null;
}

export function phone(value) {
  if (!value) {
    return null;
  }
  if (validator.isEmpty(value)) {
    return { msg: 'The phone number field must not be empty.' };
  } else if (!validator.isMobilePhone(value, ['en-ZA'], { strictMode: true })) {
    return {
      msg:
        'Please make sure your number is of the following format: +27836763454. No spaces or other special characters',
    };
  }
  return null;
}

export function website(value) {
  if (!value) {
    return null;
  }
  if (validator.isEmpty(value)) {
    return { msg: 'The website field must not be empty.' };
  } else if (!validator.isURL(value)) {
    return {
      msg: 'Please enter a valid url for your site.',
    };
  }

  return null;
}

export function dob(value) {
  if (!value) {
    return null;
  }

  if (validator.isEmpty(value)) {
    return { msg: 'The date of birth field must not be empty.' };
  } else if (
    !validator.isBefore(
      value,
      moment()
        .subtract(17, 'years')
        .format('YYYY-MM-DD')
        .toString(),
    )
  ) {
    return { msg: 'You must be 18 years and older to be on this site' };
  }

  return null;
}

export function username(value) {
  if (!value) {
    return null;
  }

  if (validator.isEmpty(value)) {
    return { msg: 'The username field must not be empty.' };
  } else if (!validator.matches(value, /^[a-zA-Z_]*$/)) {
    return {
      msg: 'Your username must not contain any special characters except _',
    };
  }
  return null;
}

/**
 * Checks if device is a mobile device
 *
 * @export
 * @returns
 */
export function _isMobile() {
  const isMobile = /iphone|ipod|android|ie|blackberry|fennec/.test(
    navigator.userAgent.toLowerCase(),
  );
  return isMobile;
}

/**
 * Checks if any other inputs is empty
 *
 * @export
 * @param {string} value
 * @returns
 */
export function generalValidator(value) {
  if (!value) {
    return null;
  }

  if (validator.isEmpty(value)) {
    return { msg: 'This field must not be empty.' };
  }

  return null;
}
