import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as validator from '../../Common/Validate/validate.jsx';
import { InputComponent } from '../../Common/Input/index.jsx';
import Authentication from '../Authentication';
import { noAuthChangePasswordAction } from '../../../redux/actions/actions';

class ChangePasswordComponent extends Authentication {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      rpassword: '',
      passwordError: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      heading: 'Forgot Password',
      buttonText: 'Change Password',
    });
  }

  validate = () => {
    let { password, passwordError, rpassword } = this.state;
    const { noAuthChangePasswordAction, id } = this.props;
    passwordError = validator.password(password, rpassword);
    this.setState(
      {
        passwordError,
      },
      function() {
        if (!passwordError) {
          const { key } = this.props.params;
          noAuthChangePasswordAction(password, key);
          browserHistory.push('/auth/login');
        }
      },
    );
  };

  renderInputFields = () => {
    const { password, passwordError, rpassword } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <InputComponent
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          handleInputChange={this.handleInputChange}
          error={passwordError}
        />
        <InputComponent
          type="password"
          name="rpassword"
          placeholder="Retype password"
          value={rpassword}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    isEmailReducer: state.isEmailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    noAuthChangePasswordAction: (password, key) =>
      dispatch(noAuthChangePasswordAction(password, key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordComponent);
