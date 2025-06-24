import React from 'react';
import { UserRow, Icon, UserImage, Span } from '../styles';
import PropTypes from 'prop-types';
/**
 *  Renders user component
 *
 * @class User
 * @extends {React.Component}
 */
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.user.checked,
    };
  }

  /**
   * Calls the onBlock/onUnblock action when user is clicked on
   *
   * @memberof User
   */
  onCheck = () => {
    const { checked } = this.state;
    const {
      user: { id },
      onBlockUser,
      onUnblockUser,
    } = this.props;

    checked ? onUnblockUser(id) : onBlockUser(id);

    this.setState({ checked: !checked });
  };

  componentDidMount() {
    const {
      user: { blocked },
    } = this.props;
    if (blocked === 1) {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const {
      user: { firstname, image, lastname },
    } = this.props;
    return (
      <UserRow className=" pr-3 " onClick={this.onCheck}>
        <UserImage src={image} />
        <Span className="ml-3">
          <b>{`${firstname} ${lastname}`}</b>
        </Span>
        {this.state.checked && (
          <Icon
            className="icon ion-ios-checkmark-outline float-right pt-2"
            size="2.3em"
          />
        )}
        {!this.state.checked && (
          <Icon
            className="icon ion-ios-radio-button-off float-right pt-2"
            size="2.3em"
          />
        )}
      </UserRow>
    );
  }
}

User.propTypes = {
  /** Contains a user's details */
  user: PropTypes.object,
  /** Contains the block action */
  onBlockUser: PropTypes.func,
  /** Contains the  unblock action */
  onUnblockUser: PropTypes.func,
};

export default User;
