import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Label from '../Common/Label';
import { Button, TextButton } from '../../../Common/Button';
import { profileWorkUpdate } from '../../../../redux/actions/actions';

class WorkComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      work: this.props.data[0],
    };
  }

  handleSaveChanges = e => {
    this.props.profileWorkUpdate(this.state.work);
  };

  handleCancelEdit = e => {
    this.setState({
      editMode: false,
      work: this.props.data[0],
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isProfileWorkUpdateSuccess) {
      this.setState({ editMode: false });
    }
  }

  render() {
    const { editMode, work } = this.state;

    return (
      <div className="row">
        <div
          className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
          style={{ padding: '0.05rem' }}
        >
          <div className="p-2 pt-0">
            <span>
              <b>Work</b>
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
              label={'Company/Organization'}
              name="work_organization"
              data={work.work_organization}
              editMode={editMode}
              onChange={e =>
                this.setState({
                  work: {
                    ...work,
                    work_organization: e.target.value,
                  },
                })
              }
            />
            <Label
              label={'Position'}
              name="work_position"
              data={work.work_position}
              editMode={editMode}
              onChange={e =>
                this.setState({
                  work: {
                    ...work,
                    work_position: e.target.value,
                  },
                })
              }
            />
            <Label
              label={'Location'}
              name="work_location"
              data={work.work_location}
              editMode={editMode}
              onChange={e =>
                this.setState({
                  work: {
                    ...work,
                    work_location: e.target.value,
                  },
                })
              }
            />
            <Label
              label={'Description'}
              name="work_description"
              data={work.work_description}
              editMode={editMode}
              onChange={e =>
                this.setState({
                  work: {
                    ...work,
                    work_description: e.target.value,
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
                  loading={this.props.isProfileWorkUpdatePending}
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
    );
  }
}

const mapStateToProps = state => ({
  data: state.profile.profile,
  isProfileWorkUpdateSuccess: state.profile.isProfileWorkUpdateSuccess,
  isProfileWorkUpdatePending: state.profile.isProfileWorkUpdatePending,
  isProfileWorkUpdateFailure: state.profile.isProfileWorkUpdateFailure,
  profileWorkUpdateError: state.profile.profileWorkUpdateError,
});

const mapDispatchToProps = { profileWorkUpdate };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkComponent);
