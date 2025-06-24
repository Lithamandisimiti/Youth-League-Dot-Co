import React from 'react';
import { Heading, ProfileRow, Icon } from './styles';
import Button from '../../../Common/Button/Button';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {
  profile,
  updateUserDataAction,
} from '../../../../redux/actions/actions.js';
import { InputComponent } from '../../../Common/Input/index.jsx';
import * as validator from '../../../Common/Validate/validate.jsx';
import { toLower } from 'lodash';

const initialFormState = {
  showNameForm: false,
  showDateform: false,
  showAccountForm: false,
  showEmailForm: false,
  showPhoneForm: false,
  showUsernameForm: false,
  showWebsiteForm: false,
};

class General extends React.Component {
  constructor(props) {
    const {
      profileReducer: { profile },
    } = props;

    const {
      dob,
      email,
      firstname,
      lastname,
      username,
      website,
      phone,
    } = profile[0];
    super(props);
    this.state = {
      ...initialFormState,
      firstname,
      lastname,
      dob,
      username,
      email,
      phone,
      website,
      phoneError: '',
      emailError: '',
      firstnameError: '',
      lastnameError: '',
      dobError: '',
      usernameError: '',
      websiteError: '',
    };
  }

  handleInputChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value.trim(),
    });
  };

  handleOnFocus = () => {
    this.setState({
      phoneError: '',
      emailError: '',
      firstnameError: '',
      lastnameError: '',
      dobError: '',
      usernameError: '',
      websiteError: '',
    });
  };

  validate = () => {
    let {
      emailError,
      phoneError,
      firstnameError,
      lastnameError,
      websiteError,
      dobError,
      usernameError,
    } = this.state;
    const {
      email,
      phone,
      firstname,
      lastname,
      website,
      dob,
      username,
    } = this.state;
    console.log(phone);
    emailError = validator.email(email);
    phoneError = validator.phone(phone);
    firstnameError = validator.generalValidator(firstname);
    lastnameError = validator.generalValidator(lastname);
    websiteError = validator.website(website);
    dobError = validator.dob(dob);
    usernameError = validator.username(username);
    this.setState(
      {
        emailError,
        phoneError,
        firstnameError,
        lastnameError,
        websiteError,
        dobError,
        usernameError,
      },
      function() {
        if (
          !emailError &&
          !phoneError &&
          !firstnameError &&
          !lastnameError &&
          !websiteError &&
          !dobError &&
          !usernameError
        ) {
          this.submit();
        }
      },
    );
  };

  submit = () => {
    const {
      dob,
      email,
      firstname,
      lastname,
      username,
      website,
      phone,
    } = this.state;

    if (dob && email && firstname && lastname && username) {
      this.props.updateUserDataAction({
        dob,
        email,
        firstname,
        lastname,
        username,
        website,
        phone,
      });
    }
  };

  toggleSettings = e => {
    const title = e.target.id;
    const {
      profileReducer: { profile },
    } = this.props;

    const {
      showAccountForm,
      showDateform,
      showEmailForm,
      showNameForm,
      showPhoneForm,
      showUsernameForm,
    } = this.state;
    let show = {};
    switch (title) {
      case 'showNameForm':
        show = { showNameForm: !showNameForm };
        break;
      case 'showDateform':
        show = { showDateform: !showDateform };
        break;
      case 'showAccountForm':
        show = { showAccountForm: !showAccountForm };
        break;
      case 'showEmailForm':
        show = { showEmailForm: !showEmailForm };
        break;
      case 'showPhoneForm':
        show = { showPhoneForm: !showPhoneForm };
        break;
      case 'showUsernameForm':
        show = { showUsernameForm: !showAccountForm };
        break;
      case 'showWebsiteForm':
        show = { showWebsiteForm: true };
        break;
      default:
        break;
    }
    this.setState({
      ...initialFormState,
      ...show,
      ...profile[0],
    });
  };

  render() {
    const {
      profileReducer: { isProfileUpdatePending, profile },
    } = this.props;

    const {
      dob,
      email,
      firstname,
      lastname,
      username,
      website,
      phone,
      dobError,
      emailError,
      firstnameError,
      lastnameError,
      usernameError,
      websiteError,
      phoneError,
    } = this.state;

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
                    <b>General</b>
                  </span>
                </div>
                <div className="Demographics">
                  <Heading className="p-2">
                    <span>Demographics</span>
                  </Heading>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showNameForm">
                      <span>Name</span>
                      {!this.state.showNameForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {`${profile[0].firstname} ${profile[0].lastname}`}
                      </span>
                    </div>

                    {this.state.showNameForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="text"
                          name="firstname"
                          placeholder="Name"
                          value={this.state.firstname}
                          handleInputChange={this.handleInputChange}
                          error={firstnameError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <InputComponent
                          type="text"
                          name="lastname"
                          placeholder="Surname"
                          value={this.state.lastname}
                          handleInputChange={this.handleInputChange}
                          error={lastnameError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit', marginTop: 20 }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                        {/* {this.state.emailError && <DisplayError message={this.state.emailError.message} />} */}
                      </div>
                    )}
                  </ProfileRow>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showDateform">
                      <span>Date Of Birth</span>
                      {!this.state.showDateform ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {profile[0].dob}
                      </span>
                    </div>

                    {this.state.showDateform && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="date"
                          name="dob"
                          placeholder="Date of Birth"
                          value={this.state.dob}
                          handleInputChange={this.handleInputChange}
                          error={dobError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          required
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                      </div>
                    )}
                  </ProfileRow>
                  {/* <ProfileRow className="p-2">
                    <div
                      onClick={() =>
                        this.setState({
                          showUsernameForm: !this.state.showUsernameForm,
                          showNameForm: false,
                          showDateform: false,
                          showAccountForm: false,
                          showEmailForm: false,
                          showPhoneForm: false,
                          showWebsiteForm: false,
                        })
                      }
                    >
                      <span>Username</span>
                      {!this.state.showUsernameForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {toLower(username)}
                      </span>
                    </div>

                    {this.state.showUsernameForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={toLower(this.state.username)}
                          handleInputChange={this.handleInputChange}
                          error={usernameError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                      </div>
                    )}
                  </ProfileRow> */}
                </div>
                <div className="Contact">
                  <Heading className="p-2">
                    <span>Contacts</span>
                  </Heading>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showEmailForm">
                      <span>Email</span>
                      {!this.state.showEmailForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {profile[0].email}
                      </span>
                    </div>

                    {this.state.showEmailForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          handleInputChange={this.handleInputChange}
                          error={emailError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                      </div>
                    )}
                  </ProfileRow>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showPhoneForm">
                      <span>Phone</span>
                      {!this.state.showPhoneForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {profile[0].phone ? profile[0].phone : 'Add phone'}
                      </span>
                    </div>

                    {this.state.showPhoneForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="text"
                          name="phone"
                          placeholder="Phone"
                          value={this.state.phone}
                          handleInputChange={this.handleInputChange}
                          error={phoneError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                      </div>
                    )}
                  </ProfileRow>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showWebsiteForm">
                      <span>Website</span>
                      {!this.state.showWebsiteForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        {profile[0].website
                          ? profile[0].website
                          : 'Add website'}
                      </span>
                    </div>

                    {this.state.showWebsiteForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <InputComponent
                          type="text"
                          name="website"
                          placeholder="Website"
                          value={this.state.website}
                          handleInputChange={this.handleInputChange}
                          error={websiteError}
                          handleOnFocus={this.handleOnFocus}
                          style={{ fontSize: 'inherit' }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                        />
                        <div className="pt-3">
                          <Button
                            text="Update "
                            loading={isProfileUpdatePending}
                            onClick={this.validate}
                          />
                        </div>
                      </div>
                    )}
                  </ProfileRow>
                </div>
                <div className="Account">
                  <Heading className="p-2">
                    <span>Account</span>
                  </Heading>
                  <ProfileRow className="p-2">
                    <div onClick={this.toggleSettings} id="showAccountForm">
                      <span>Manage Account</span>
                      {!this.state.showAccountForm ? (
                        <Icon className="ion-ios-arrow-right float-right pr-2" />
                      ) : (
                        <Icon className="ion-ios-arrow-down float-right pr-2" />
                      )}

                      <span
                        className="float-right pr-5"
                        style={{ color: 'grey' }}
                      >
                        Deactivate your account
                      </span>
                    </div>

                    {this.state.showAccountForm && (
                      <div className="form-group mb-sm-2 mb-2 mt-3 pl-3 pr-3">
                        <b>Deactivate your account</b>

                        <p className="pt-1">
                          Deactivating your account will disable your profile
                          and prevent you data from being shown anywhere on the
                          YouthLeague site
                        </p>

                        <div className="pt-2">
                          <Link to="/deactivate-your-account">
                            Deactivate your account
                          </Link>
                        </div>
                      </div>
                    )}
                  </ProfileRow>
                </div>
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
    profileReducer: state.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profile: username => dispatch(profile(username)),
    updateUserDataAction: newData => dispatch(updateUserDataAction(newData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(General);
