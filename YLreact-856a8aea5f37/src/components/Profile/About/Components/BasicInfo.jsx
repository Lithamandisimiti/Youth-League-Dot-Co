import React, { Component } from 'react';
import { connect } from 'react-redux';

import { profile, profileBasicUpdate } from '../../../../redux/actions/actions';

import Label from '../Common/Label';
import { Button, TextButton } from '../../../Common/Button';
import Spinner from '../../../Common/Spinner/Spinner';

class BasicInfoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      user: this.props.data[0],
    };
  }

  handleSaveChanges = e => {
    this.props.profileBasicUpdate(this.state.user);
  };

  handleCancelEdit = e => {
    this.setState({
      editMode: false,
      user: this.props.data[0],
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isProfileBasicUpdateSuccess) {
      this.setState({ editMode: false });
    }
  }

  render() {
    const { editMode, user } = this.state;

    return (
      <div>
        <div className="row">
          <div
            className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
            style={{ padding: '0.05rem' }}
          >
            <div className="p-2 pt-0">
              <span>
                <b>Basic</b>
              </span>
              <span className="float float-right">
                <TextButton
                  onClick={() => this.setState({ editMode: !editMode })}
                  text="Edit"
                />
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <Label
                label={'Username'}
                name="username"
                data={user.username}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      username: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Email'}
                name="email"
                data={user.email}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      email: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Name'}
                name="firstname"
                data={user.firstname}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      firstname: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Lastname'}
                name="lastname"
                data={user.lastname}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      lastname: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Gender'}
                name="gender"
                data={user.gender}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      gender: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Date Of Birth'}
                name="dob"
                data={user.dob}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      dob: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Residence'}
                name="location"
                data={user.location}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      location: e.target.value,
                    },
                  })
                }
              />
              <Label
                label={'Website'}
                name="website"
                data={user.website}
                editMode={editMode}
                onChange={e =>
                  this.setState({
                    user: {
                      ...user,
                      website: e.target.value,
                    },
                  })
                }
              />
            </div>
            {editMode && (
              <div className="col-sm-12 controls row">
                <div className="col-sm-6 controls">
                  <Button
                    type="save"
                    text="Save"
                    loading={this.props.isProfileBasicUpdatePending}
                    onClick={e => {
                      this.handleSaveChanges(e);
                    }}
                  />
                </div>
                <div className="col-sm-6 controls">
                  <Button
                    type="cancel"
                    text="Cancel"
                    onClick={e => {
                      this.handleCancelEdit(e);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.profile.profile,
  isProfileBasicUpdateSuccess: state.profile.isProfileBasicUpdateSuccess,
  isProfileBasicUpdatePending: state.profile.isProfileBasicUpdatePending,
  isProfileBasicUpdateFailure: state.profile.isProfileBasicUpdateFailure,
});

const mapDispatchToProps = {
  profile,
  profileBasicUpdate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BasicInfoComponent);
