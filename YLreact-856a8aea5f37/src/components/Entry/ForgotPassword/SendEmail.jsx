import React from 'react';
import { connect } from 'react-redux';

import * as validator from '../../Common/Validate/validate.jsx';
import { browserHistory } from 'react-router';
import { InputComponent } from '../../Common/Input/index.jsx';
import Authentication from '../Authentication';
import {
  sendEmailAction,
  resetEmailReducerAction,
} from '../../../redux/actions/actions';
import PropType from 'prop-types';

/**
 * Renders the SendEmail component
 *
 * @class SendEmailComponent
 * @extends {Authentication}
 */
class SendEmailComponent extends Authentication {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      heading: 'Forgot Password',
      buttonText: 'Send Email',
      subHeading: 'Enter your email',
    });
  }

  componentDidUpdate() {
    const {
      sendEmailReducer: { isEmailSuccess, isEmailPending },
    } = this.props;
    const { isLoading } = this.state;
    if (isEmailPending !== isLoading) {
      this.setState({
        isLoading: isEmailPending,
      });
    }
    if (isEmailSuccess) {
      browserHistory.push('/auth/email-sent');
    }
  }

  componentWillUnmount() {
    const { resetEmailReducerAction } = this.props;
    resetEmailReducerAction();
  }

  /**
   * Validates input fields before submitting
   *
   * @memberof SendEmailComponent
   */
  validate = () => {
    let { email, emailError } = this.state;
    const { sendEmailAction } = this.props;
    emailError = validator.email(email);

    this.setState(
      {
        emailError: emailError,
      },
      function() {
        setTimeout(() => {
          this.setState({
            emailError: undefined,
          });
        }, 3000);
        if (!emailError) {
          sendEmailAction(email);
        }
      },
    );
  };

  /**
   * Renders the input fields of class
   *
   * @memberof SendEmailComponent
   */
  renderInputFields = () => {
    const { email, emailError } = this.state;

    return (
      <InputComponent
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        handleInputChange={this.handleInputChange}
        error={emailError ? emailError : ''}
      />
    );
  };
}

const mapStateToProps = state => {
  return {
    sendEmailReducer: state.sendEmailReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendEmailAction: email => dispatch(sendEmailAction(email)),
    resetEmailReducerAction: () => dispatch(resetEmailReducerAction()),
  };
};

SendEmailComponent.propTypes = {
  /** Contains the state of the send email action */
  sendEmailReducer: {
    isEmailSuccess: PropType.bool,
    isEmailPending: PropType.bool,
  },
  /** Dispatches the send email action when called */
  sendEmailAction: PropType.func,
  /** Dispatches the resetEmail action when called  */
  resetEmailReducerAction: PropType.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendEmailComponent);
