import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Parent component of the Login, Register, ForgotPassword and ChangePassword screen
 *
 * @class NonAuthComponent
 * @extends {React.Component}
 */
class NonAuthComponent extends React.Component {
  render() {
    const {
      authenticateReducer: { isLoggedIn },
      children,
    } = this.props;
    if (isLoggedIn) {
      browserHistory.goBack();
      //TODO Render  generic page loader
      return null;
    }
    return children;
  }
}

const mapStateToProps = state => {
  return {
    authenticateReducer: state.authenticate,
  };
};

NonAuthComponent.propTypes = {
  /** Contains the login state of the user  */
  authenticateReducer: {
    isLoggedIn: PropTypes.bool,
  },
  /** Contains the classes and components to be rendered */
  children: PropTypes.elementType,
};

export default connect(mapStateToProps)(NonAuthComponent);
