import React from 'react';
import { Heading, Checklist } from '../styles';
import User from './User';
import {
  blockAction,
  unBlockAction,
  getUsersAction,
} from '../../../../../redux/actions/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Blocking extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Emits redux action to block a follower from this account
   *
   * @param {string} userId
   * @memberof Blocking
   */
  onBlockUser = userId => {
    const { blockAction } = this.props;
    blockAction(userId);
  };

  /**
   * Emits redux action to unblocks a follower from this account
   *
   * @param {string} userId
   * @memberof Blocking
   */
  onUnblockUser = userId => {
    const { unBlockAction } = this.props;
    unBlockAction(userId);
  };

  componentDidMount() {
    const { getUsersAction } = this.props;
    getUsersAction();
  }

  render() {
    const {
      followers: { getUsersSuccess, isGetUsersPending },
    } = this.props;

    if (isGetUsersPending || !getUsersSuccess) {
      //TODO return a page loader
      return null;
    }

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 pb-0 pt-0"
          style={{ margin: '0 auto', float: 'none' }}
        >
          <div className=" m-0 p-0" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="row home-trades">
              <div
                className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
                style={{ padding: '0.05rem' }}
              >
                <div className="p-2 pt-0">
                  <span>
                    <b>Blocking</b>
                  </span>
                </div>
                <Heading className="p-2">
                  <span>Block users</span>
                </Heading>
                <Checklist className="pt-3">
                  {getUsersSuccess.map(user => {
                    const { userId } = user;
                    return (
                      <User
                        user={user}
                        onBlockUser={this.onBlockUser}
                        onUnblockUser={this.onUnblockUser}
                        key={userId}
                      />
                    );
                  })}
                </Checklist>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    followers: state.getUsersReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    blockAction: id => dispatch(blockAction(id)),
    unBlockAction: id => dispatch(unBlockAction(id)),
    getUsersAction: () => dispatch(getUsersAction()),
  };
};

Blocking.propTypes = {
  /** Gets all the followers who are blocked and not blocked */
  getUsersAction: PropTypes.func,
  /** Unblocks a follower from this account */
  unBlockAction: PropTypes.func,
  /** Blocks a follower from this account */
  blockAction: PropTypes.func,
  /** Contains all the followers returned from getUserAction */
  followers: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blocking);
