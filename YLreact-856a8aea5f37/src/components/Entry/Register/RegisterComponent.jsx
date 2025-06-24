import React from 'react';
import { Link, browserHistory } from 'react-router';
import Button from '../../Common/Button/Button';

import { connect } from 'react-redux';
import {
  register,
  validateEmail,
  validateUsername,
} from '../../../redux/actions/actions';

import DisplayError from '../../Common/Error/DisplayError';

import * as validator from '../../Common/Validate/validate.jsx';
import '../entry.css';
import { toLower } from 'lodash';

class RegisterComponent extends React.Component {
  userData = {
    firstName: '',
    lastName: '',
    userName: '',
    dob: '',
    residence: '',
    email: '',
    password: '',
    acceptedTerms: false,
  };
  dataError = {
    firstNameErr: '',
    lastNameErr: '',
    userNameErr: '',
    dobErr: '',
    residenceErr: '',
    emailErr: '',
    passwordErr: '',
    confirmPassErr: '',
    acceptedTermsErr: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      ...this.userData,
      ...this.dataError,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleEmailValidation = this.handleEmailValidation.bind(this);
  }

  handleEmailValidation() {
    this.props.validateEmail({ email: this.state.email.trim(), state: 1 });
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    if (name === 'email') {
      this.setState({
        emailErr: '',
      });
    }

    if (name === 'userName') {
      this.props.validateUsername({ username: toLower(value.trim()) });
      this.setState({
        [name]: toLower(value.trim()),
      });
    } else {
      this.setState({
        [name]: value.trim(),
      });
    }
  }

  handleCheckboxChange(e) {
    const { name, checked } = e.target;

    this.setState({
      [name]: checked,
    });
  }

  submitForm(e) {
    e.preventDefault();
    this.setState({ ...this.dataError });

    if (this.validate()) {
      //submit user details
      const submitData = this.userData;
      for (const name in this.userData) {
        submitData[name] = this.state[name];
      }

      this.props.register(submitData);
    }
  }

  validate() {
    let valid = true;
    //do some validation here
    const stateError = { ...this.dataError };
    if (this.state.password !== this.state.confirmPass) {
      valid = false;
      stateError.confirmPassErr = 'Passwords do not match';
    }

    const validatePassword = validator.password(this.state.password);
    if (validatePassword != null) {
      valid = false;
      stateError.passwordErr = validatePassword.msg;
    }

    const validateEmail = validator.email(this.state.email);
    if (validateEmail != null) {
      valid = false;
      stateError.emailErr = validateEmail.msg;
    }

    const validateUsername = validator.username(this.state.userName);
    if (validateUsername != null) {
      valid = false;
      stateError.userNameErr = validateUsername.msg;
    }

    const validateDOB = validator.dob(this.state.dob);
    if (validateDOB != null) {
      valid = false;
      stateError.dobErr = validateDOB.msg;
    }

    const validateFirstName = validator.generalValidator(this.state.firstName);
    if (validateFirstName != null) {
      valid = false;
      stateError.firstNameErr = validateFirstName.msg;
    }

    const validateLastName = validator.generalValidator(this.state.lastName);
    if (validateLastName != null) {
      valid = false;
      stateError.lastNameErr = validateLastName.msg;
    }

    const validateResidence = validator.generalValidator(this.state.residence);
    if (validateResidence != null) {
      valid = false;
      stateError.residenceErr = validateResidence.msg;
    }

    this.setState({ ...stateError });

    return valid;
  }

  render() {
    const { isRegisterPending, registerError, registerFailure } = this.props;

    return (
      <div>
        <form
          className="col-12 col-sm-8 col-md-6 col-sm-offset-4 col-lg-4 col-lg-offset-6 mb-3"
          style={{ margin: '0 auto', float: 'none' }}
          onSubmit={this.submitForm}
        >
          <h1>Register</h1>
          <div className="form-row">
            {/*firstName*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  autoComplete="off"
                  placeholder="First Name"
                  value={this.state.firstName}
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  required
                />
                {this.state.firstNameErr && (
                  <DisplayError message={this.state.firstNameErr} />
                )}
              </div>
            </div>
            {/*lastName*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Last Name"
                  style={{ fontSize: 'inherit' }}
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  required
                />
                {this.state.lastNameErr && (
                  <DisplayError message={this.state.lastNameErr} />
                )}
              </div>
            </div>
            {/*userName*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="text"
                  name="userName"
                  className="form-control"
                  autoComplete="off"
                  placeholder="User Name"
                  style={{ fontSize: 'inherit' }}
                  value={this.state.userName}
                  onChange={this.handleInputChange}
                  required
                />
                {this.state.userNameErr && (
                  <DisplayError message={this.state.userNameErr} />
                )}
                {this.props.usernameValid && (
                  <DisplayError message={this.props.usernameValid.msg} />
                )}
              </div>
            </div>
            {/*dob*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Date of Birth"
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  value={this.state.dob}
                  required
                />
                {this.state.dobErr && (
                  <DisplayError message={this.state.dobErr} />
                )}
              </div>
            </div>
            {/*residence*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="text"
                  name="residence"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Residence"
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  value={this.state.residence}
                />
                {this.state.residenceErr && (
                  <DisplayError message={this.state.residenceErr} />
                )}
              </div>
            </div>
            {/*email*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Email"
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  value={this.state.email}
                  required
                  onBlur={this.handleEmailValidation}
                />
                {(this.state.emailErr || this.props.emailValid) && (
                  <DisplayError
                    message={this.state.emailErr || this.props.emailValid.msg}
                  />
                )}
              </div>
            </div>
            {/*password*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Password"
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  value={this.state.password}
                  required
                />
                {this.state.passwordErr && (
                  <DisplayError message={this.state.passwordErr} />
                )}
              </div>
            </div>
            {/*confirmPass*/}
            <div className="input-component col-sm-6">
              <div className="form-group mb-sm-2 mb-2">
                <input
                  type="password"
                  name="confirmPass"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  style={{ fontSize: 'inherit' }}
                  onChange={this.handleInputChange}
                  value={this.state.confirmPass}
                  required
                />
                {this.state.confirmPassErr && (
                  <DisplayError message={this.state.confirmPassErr} />
                )}
              </div>
            </div>
            {/*acceptedTerms*/}
            <div className="input-component col-sm-6">
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    name="acceptedTerms"
                    type="checkbox"
                    className="form-check-input"
                    onChange={this.handleCheckboxChange}
                    value={this.state.acceptedTerms}
                    required
                  />
                  I accept the{' '}
                  <Link to="/terms-and-conditions">terms and conditions</Link>
                </label>
              </div>
            </div>
            {/*constrols*/}
            <div className="col-sm-12 controls">
              <Button
                type="submit"
                text="submit"
                disabled={!this.state.acceptedTerms}
              />
              <Button
                type="reset"
                text="cancel"
                disabled={false}
                onClick={() => {
                  browserHistory.goBack();
                }}
              />
              {isRegisterPending && 'please wait'}
              {registerError && (
                <span className="pt-2" style={{ color: 'red' }}>
                  {registerError.message}
                </span>
              )}
              {registerFailure && (
                <span className="pt-2" style={{ color: 'red' }}>
                  {registerFailure.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    register: state.register.register,
    isRegisterPending: state.register.isLoginPending,
    isRegisterSuccess: state.register.isLoginSuccess,
    registerError: state.register.loginError,
    registerFailure: state.register.loginFailure,
    emailValid: state.validateEmail.email,
    isEmailPending: state.validateEmail.isEmailPending,
    isEmailSuccess: state.validateEmail.isEmailSuccess,
    emailError: state.validateEmail.emailError,
    emailFailure: state.validateEmail.emailFailure,
    usernameValid: state.validateUsername.username,
    isUsernamePending: state.validateUsername.isUsernamePending,
    isUsernameSuccess: state.validateUsername.isUsernameSuccess,
    usernameError: state.validateUsername.usernameError,
    usernameFailure: state.validateUsername.usernameFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: userData => dispatch(register(userData)),
    validateEmail: email => dispatch(validateEmail(email)),
    validateUsername: username => dispatch(validateUsername(username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterComponent);
