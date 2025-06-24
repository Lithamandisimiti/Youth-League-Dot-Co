import React from 'react';
import { Heading, ProfileRow } from './styles';
import Button from '../../../Common/Button/Button';
import { Link } from 'react-router';
import { authChangePasswordAction } from '../../../../redux/actions/actions';
import { connect } from 'react-redux';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  }

  onUpdate() {
    const userId = localStorage.getItem('userId');
    const { password, newPassword } = this.state;
    this.props.authChangePasswordAction(userId, password, newPassword);
  }

  render() {
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
                    <b>Security and Login</b>
                  </span>
                </div>
                <Heading className="p-2">
                  <span>Change Password</span>
                </Heading>
                <ProfileRow className="p-2">
                  <div
                    onClick={() =>
                      this.setState({ showDateform: !this.state.showDateform })
                    }
                  >
                    <span>Password</span>
                    <span
                      className="float-right pr-5"
                      style={{ color: 'grey' }}
                    >
                      *********
                    </span>
                  </div>
                  <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Current Password"
                      style={{ fontSize: 'inherit' }}
                      onChange={this.handleInputChange}
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      autoComplete="off"
                      placeholder="New Password"
                      style={{ fontSize: 'inherit' }}
                      onChange={this.handleInputChange}
                      value={this.state.newPassword}
                      required
                    />
                    <Link className="link" to="/auth/forgot-password">
                      <span className="forgot-password mt-2">
                        Forgot your password?
                      </span>
                    </Link>

                    <div className="mt-4">
                      <Button text="Update" onClick={this.onUpdate} />
                    </div>
                  </div>
                </ProfileRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    authChangePasswordAction: (id, oldPass, newPass) =>
      dispatch(authChangePasswordAction(id, oldPass, newPass)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
