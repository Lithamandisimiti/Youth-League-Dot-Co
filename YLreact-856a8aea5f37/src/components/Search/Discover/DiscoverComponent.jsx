import React from 'react';
import { User2 as User } from '../../Common/User/User.jsx';
import { connect } from 'react-redux';
import { discover, follow } from '../../../redux/actions/actions';

class DiscoverComponet extends React.Component {
  render() {
    if (this.props.data.isDiscoverSuccess) {
      return (
        <div className="row">
          <div
            className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
            style={{ margin: '0 auto', float: 'none' }}
          >
            <div className="row">
              {this.props.data.discover.length > 0 &&
                this.props.data.discover.map(user => {
                  user.follow = false;
                  if (user.user_id != localStorage.getItem('userId')) {
                    return (
                      <User
                        user={user}
                        follow={this.props.follow}
                        key={user.user_id}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
      );
    }

    if (this.props.data.isDiscoverPending) {
      return (
        <div className="row">
          <div
            className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
            style={{ margin: '0 auto', float: 'none' }}
          >
            <div className="row">Loading</div>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
          style={{ margin: '0 auto', float: 'none' }}
        >
          <div className="row">Nothing to show</div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.discover();
  }
}

const mapStateToProps = state => {
  return {
    data: state.discover,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    discover: () => dispatch(discover()),
    follow: (id, isFollow) => dispatch(follow(id, isFollow)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscoverComponet);
