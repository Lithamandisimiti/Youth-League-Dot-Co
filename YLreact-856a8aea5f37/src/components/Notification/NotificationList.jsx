import React from 'react';
import { browserHistory } from 'react-router';
import './Notifications.css';
import NotificationLine from './NotificationLine';
import { connect } from 'react-redux';
import { closeNavigationDropdown } from '../../redux/actions/actions';
import { nodeHost } from '../../redux/actions/actions';

class NotificationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewAll: false,
    };
  }
  viewAllClick() {
    this.setState({ viewAll: true });
    this.props.closeNavigationDropdown();
    browserHistory.push('/notifications');
  }
  render() {
    return (
      <div className="notifications-holder">
        {this.props.notifications.map((notif, i) => {
          return (
            <NotificationLine
              message={notif.message}
              image={nodeHost + notif.image}
              date={notif.date}
              time={notif.time}
              key={i}
            />
          );
        })}
        {!this.state.viewAll && (
          <div className="notifications-view-all-holder">
            {this.props.notifications.length === 0 ? (
              <div className="notifications-none">No notifications</div>
            ) : (
              <div
                className="notifications-view-all"
                onClick={() => this.viewAllClick()}
              >
                View all
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications.notificationList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeNavigationDropdown: () => dispatch(closeNavigationDropdown()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationList);
