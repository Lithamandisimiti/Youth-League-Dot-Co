import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../../redux/actions/actions';
import DisplayError from '../../Common/Error/DisplayError';
import * as validator from '../../Common/Validate/validate.jsx';
import Authentication from '../Authentication';
import { InputComponent } from '../../Common/Input/index.jsx';
import '../entry.css';

/**
 * Renders the login screen
 *
 * @class LoginComponent
 * @extends {Authentication}
 */
class LoginComponent extends Authentication {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: undefined,
      passwordError: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      heading: 'Login',
      buttonText: 'Login',
    });
  }

  componentDidUpdate() {
    const {
      loginReducer: { isLoginPending },
    } = this.props;
    const { isLoading } = this.state;
    if (isLoginPending !== isLoading) {
      this.setState({
        isLoading: isLoginPending,
      });
    }
  }

  /**
   * Handles the change of the input values
   *
   * @param {object} e Contains the event of the input element
   * @memberof LoginComponent
   */
  handleInputChange = e => {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value.trim(),
    });
  };

  /**
   * Clears input errors on text input focus
   *
   * @param {object} e Contains the event of the input element
   * @memberof LoginComponent
   */
  handleOnFocus = e => {
    const name = `${e.target.name}Error`;
    this.setState({
      [name]: undefined,
    });
  };

  /**
   * Validates the input fields before submitting
   *
   * @memberof LoginComponent
   */
  validate = () => {
    let { emailError, passwordError } = this.state;
    emailError = validator.email(this.state.email);
    passwordError = validator.password(this.state.password);
    this.setState(
      {
        emailError,
        passwordError,
      },
      function() {
        if (!this.state.emailError && !this.state.passwordError) {
          this.props.login(this.state.email, this.state.password);
        }
      },
    );
  };

  /**
   * Renders the inputs for login component
   *
   * @memberof LoginComponent
   */
  renderInputFields = () => {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <InputComponent
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          handleInputChange={this.handleInputChange}
          error={emailError}
          handleOnFocus={this.handleOnFocus}
        />
        <InputComponent
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          handleInputChange={this.handleInputChange}
          error={passwordError}
          handleOnFocus={this.handleOnFocus}
        />
      </div>
    );
  };

  /**
   * Renders the error component on login failure
   *
   * @memberof LoginComponent
   */
  renderDisplayError = () => {
    const {
      loginReducer: { loginFailure },
    } = this.props;

    return (
      <div className="ml-4">
        {loginFailure && <DisplayError message={loginFailure.msg} />}
      </div>
    );
  };

  /**
   * Renders the forgot password text link
   *
   * @memberof LoginComponent
   */
  renderTextButton = () => {
    return (
      <div className="forgot-password-div col-12">
        <Link
          className="link"
          to="/auth/forgot-password"
          style={{ float: 'right' }}
        >
          <span className="forgot-password">Forgot your password?</span>
        </Link>
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    loginReducer: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
};

LoginComponent.propTypes = {
  /** Contains the login action */
  login: PropTypes.func,
  /** Contains the state of the login process */
  loginReducer: {
    loginFailure: {
      msg: PropTypes.string,
    },
    isLoginPending: PropTypes.bool,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);
