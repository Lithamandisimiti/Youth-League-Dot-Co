import React from 'react';
//import { Router, Route, Link, IndexLink, hashHistory, browserHistory, IndexRoute  } from 'react-router';

import { Users } from '../../Common/User/User.jsx';
import Spinner from '../../Common/Spinner/Spinner.jsx';

import { connect } from 'react-redux';
import { following, follow } from '../../../redux/actions/actions';
import Error from '../../Common/Error/Error';
import { ErrorMessages } from '../../../constants';

class Opt extends React.Component {
  render() {
    return (
      <div>
        <div className="p-2 pt-0">
          <span>
            <b>{this.props.name}</b>
          </span>
        </div>
      </div>
    );
  }
}

class FollowingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.params.username,
      id: props.profile.id,
    };
  }

  componentDidMount() {
    this.props.following(this.state.id);
  }

  render() {
    const {
      data,
      isFollowingPending,
      isFollowingSuccess,
      followingError,
      followingFailure,
    } = this.props;

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 pb-0 pt-0"
          style={{ margin: '0 auto', float: 'none' }}
        >
          <div className="row home-trades">
            <div
              className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
              style={{ padding: '0.05rem' }}
            >
              <Opt name={'Following'} />
            </div>
          </div>
          {isFollowingPending && <Spinner />}
          {isFollowingSuccess && (
            <Users users={data} follow={this.props.follow} />
          )}
          {followingError && (
            <Error message={ErrorMessages.generalErrorMessage} />
          )}
          {followingFailure && (
            <Error message={ErrorMessages.connectionError} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile[0],
    data: state.following.following,
    isFollowingPending: state.following.isFollowingPending,
    isFollowingSuccess: state.following.isFollowingSuccess,
    followingError: state.following.followingError,
    followingFailure: state.following.followingFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    following: id => dispatch(following(id)),
    follow: (id, isFollow) => dispatch(follow(id, isFollow)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowingComponent);
