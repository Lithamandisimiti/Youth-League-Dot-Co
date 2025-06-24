import React from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';

// data
import { profile } from '../../redux/actions/actions';

// Components
import Button from '../Common/Button/Button.jsx';
import Error from '../Common/Error/Error';
import Profile from './Profile/Profile';
import Spinner from '../Common/Spinner/Spinner.jsx';
import { ErrorMessages } from '../../constants';

import './profile.css';

//import Gallery from '../Search/Explore/ExploreComponent.jsx';

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.params.username,
    };
  }

  componentDidMount() {
    this.props.profile(this.state.username);
  }

  componentDidUpdate(prevProps) {
    // respond to parameter change in scenario 3
    const oldUsername = prevProps.params.username;
    const newUsername = this.props.params.username;
    if (newUsername !== oldUsername) {
      this.props.profile(this.props.params.username);
      this.setState({
        username: this.props.params.username,
      });
    }
    //this.fetchProfile()
  }

  render() {
    const {
      data,
      children,
      followers,
      following,
      isProfilePending,
      isLoggedIn,
      isProfileSuccess,
      profileError,
      profileFailure,
    } = this.props;

    return (
      <div>
        {/*this.state.id} and {localStorage.getItem("userId")*/}
        {isProfilePending && !profileError && !profileError && (
          <div className="mt-3">
            <Spinner />
          </div>
        )}
        {isProfileSuccess && (
          <Profile
            isLoggedIn={isLoggedIn}
            profile={data[0]}
            followers={followers}
            following={following}
            children={children}
            username={this.state.username}
          />
        )}
        {profileError && <Error message={ErrorMessages.generalErrorMessage} />}
        {profileFailure && <Error message={ErrorMessages.connectionError} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authenticate.isLoggedIn,
    data: state.profile.profile,
    following: state.profile.following,
    followers: state.profile.followers,
    isProfilePending: state.profile.isProfilePending,
    isProfileSuccess: state.profile.isProfileSuccess,
    profileError: state.profile.profileError,
    profileFailure: state.profile.profileFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //reset: () => dispatch(reset()),
    profile: username => dispatch(profile(username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);
