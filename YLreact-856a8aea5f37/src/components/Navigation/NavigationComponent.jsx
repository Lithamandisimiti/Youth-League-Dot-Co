import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  toggleNavigationDropdown,
  closeNavigationDropdown,
  initNotifications,
  mobileViewNotification,
} from '../../redux/actions/actions';
import NotificationList from '../Notification/NotificationList';
import Button from '../Common/Button/Button.jsx';
import { FooterComponent } from '../Footer/Footer';
import { Breakpoints } from '../../helpers/constants';
import {
  Nav,
  RowContainer,
  Logo,
  Anchor,
  List,
  Item,
  Icon,
  Badge,
  NotificationComponent,
  Arrow,
} from './styles';

/**
 * Renders the navigation options
 *
 * @class NavigationComponent
 * @extends {React.Component}
 */
class NavigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    const { screenWidth } = this.state;
    const {
      authenticateReducer: { isLoggedIn, userName },
      notificationReducer: { dropdownOpen, notifications },
      toggleNavigationDropdown,
      children,
      mobileViewNotification,
      closeNavigationDropdown,
    } = this.props;
    const isMobile = parseInt(screenWidth) <= parseInt(Breakpoints.tablet);

    return (
      <div>
        <Nav>
          <List isLoggedIn={isLoggedIn}>
            {dropdownOpen && (
              <div
                onClick={() => closeNavigationDropdown()}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: window.innerHeight,
                }}
              />
            )}
            <Item isLogo isLoggedIn={isLoggedIn}>
              <Anchor to="/" isLogo>
                <Logo
                  src={`${process.env.PUBLIC_URL}/images/logo.png`}
                  alt="logo"
                />
              </Anchor>
            </Item>
            {isLoggedIn && (
              <Item>
                <Anchor to="/explore">
                  <Icon className="icon ion-ios-compass" />
                  Explore
                </Anchor>
              </Item>
            )}
            {isLoggedIn && !isMobile && (
              <Item>
                <Anchor to="/categories">
                  <Icon className="icon ion-ios-search" />
                  Search
                </Anchor>
              </Item>
            )}
            {isLoggedIn && (
              <Item>
                <Anchor
                  to={isMobile ? '/notifications' : ''}
                  onClick={() => {
                    isMobile
                      ? mobileViewNotification()
                      : toggleNavigationDropdown();
                  }}
                >
                  {notifications > 0 && <Badge>{notifications}</Badge>}
                  <Icon className="ion-ios-bell-outline" />
                  Notifications
                </Anchor>
                {dropdownOpen && (
                  <div>
                    <Arrow className="ion-android-arrow-dropup" />
                    <NotificationComponent>
                      <NotificationList />
                    </NotificationComponent>
                  </div>
                )}
              </Item>
            )}
            {isLoggedIn && (
              <Item>
                <Anchor to={'/' + userName}>
                  <Icon className="ion-ios-person-outline" />
                  Profile
                </Anchor>
              </Item>
            )}

            {!isLoggedIn && (
              <RowContainer>
                <Item>
                  <Anchor to={'/auth/login'}>Login</Anchor>
                </Item>
                <Item>
                  <Anchor to={'/auth/register'}>
                    <Button
                      type="submit"
                      text="Sign Up"
                      styles={{ fontSize: '1em' }}
                    />
                  </Anchor>
                </Item>
              </RowContainer>
            )}
          </List>
        </Nav>

        <div className="fixed-padding-top">{children}</div>

        <FooterComponent />
      </div>
    );
  }

  componentDidMount() {
    const {
      initNotifications,
      authenticateReducer: { isLoggedIn },
    } = this.props;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    isLoggedIn ? initNotifications() : null;
  }

  /**
   * Updates the screen width to current width dimensions
   *
   * @memberof NavigationComponent
   */
  updateWindowDimensions = () => {
    this.setState({ screenWidth: window.innerWidth });
  };
}

const mapStateToProps = state => {
  return {
    authenticateReducer: state.authenticate,
    notificationReducer: state.notifications,
    socket: state.notifications.socket,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNavigationDropdown: () => dispatch(toggleNavigationDropdown()),
    closeNavigationDropdown: () => dispatch(closeNavigationDropdown()),
    initNotifications: () => dispatch(initNotifications()),
    mobileViewNotification: () => dispatch(mobileViewNotification()),
  };
};

NavigationComponent.propTypes = {
  /** Contains the login state of the user  */
  authenticateReducer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    userName: PropTypes.string,
  }),
  /** Contains the notification state of user */
  notificationReducer: PropTypes.shape({
    notifications: PropTypes.number,
    dropdownOpen: PropTypes.bool,
  }),
  /** Contains the classes and components to be rendered */
  children: PropTypes.object,
  toggleNavigationDropdown: PropTypes.func,
  initNotifications: PropTypes.func,
  mobileViewNotification: PropTypes.func,
  closeNavigationDropdown: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationComponent);
