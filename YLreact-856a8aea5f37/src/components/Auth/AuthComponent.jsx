import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * Parent class of all pages that need authorization to be able to access
 *
 * @class AuthComponent
 * @extends {React.Component}
 */
class AuthComponent extends React.Component {
  render() {
    const {
      authenticateReducer: { isLoggedIn },
      children,
    } = this.props;
    if (!isLoggedIn) {
      browserHistory.push('/auth/login');
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

AuthComponent.propTypes = {
  /** Contains the login state of the user  */
  authenticateReducer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
  /** Contains the classes and components to be rendered */
  children: PropTypes.object,
};

export default connect(mapStateToProps)(AuthComponent);
