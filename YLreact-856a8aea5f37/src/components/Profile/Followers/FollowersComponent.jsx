import React from 'react';
//import { Link, IndexLink, browserHistory, IndexRoute  } from 'react-router';

import { Users } from '../../Common/User/User.jsx';
import Spinner from '../../Common/Spinner/Spinner.jsx';

import { connect } from 'react-redux';
import { followers, follow, following } from '../../../redux/actions/actions';
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

class FollowersComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.params.username,
      id: props.profile.id,
    };
  }

  componentDidMount() {
    //window.scrollTo(0,0);
    this.props.followers(this.state.id);
  }

  render() {
    const {
      data,
      isFollowersPending,
      isFollowersSuccess,
      followersError,
      followersFailure,
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
              <Opt name={'Followers'} />
            </div>
          </div>
          {isFollowersPending && <Spinner />}
          {isFollowersSuccess && (
            <Users users={data} follow={this.props.follow} />
          )}
          {followersError && (
            <Error message={ErrorMessages.generalErrorMessage} />
          )}
          {followersFailure && (
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
    data: state.followers.followers,
    isFollowersPending: state.followers.isFollowersPending,
    isFollowersSuccess: state.followers.isFollowersSuccess,
    followersError: state.followers.followersError,
    followersFailure: state.followers.followersFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    followers: id => dispatch(followers(id)),
    follow: (id, isFollow) => dispatch(follow(id, isFollow)),
    following: id => dispatch(following(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowersComponent);
