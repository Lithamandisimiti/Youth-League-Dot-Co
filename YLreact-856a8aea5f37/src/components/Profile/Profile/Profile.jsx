import React from 'react';
import { browserHistory } from 'react-router';

import Nav from './Nav';
import Stats from './Stats';
import ProfilePictureChange from './ProfilePictureChange';
import { DEFAULT_USER_IMAGE } from '../../../helpers/constants.js';
import { nodeHost } from '../../../redux/actions/actions';
import './profile.css';
import Header from './Header';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.profile.image,
      openModal: true,
    };

    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
    this.inputProfile = this.inputProfile.bind(this);
  }

  onImageError = () => {
    this.setState({ image: `${process.env.PUBLIC_URL}/images/user.png` });
  };

  quote() {
    browserHistory.push('/request');
  }

  openProfileModal() {
    this.setState({
      openModal: true,
    });
  }

  getProfileChange() {}

  inputProfile() {
    this.refs.profileChanger.getWrappedInstance().inputProfile();
  }

  closeProfileModal() {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const imgStyle = { objectFit: 'cover', borderRadius: '50%' };
    this.props.isLoggedIn
      ? localStorage.getItem('userId') === this.props.profile.id
        ? (imgStyle.cursor = 'pointer')
        : {}
      : {};
    const jumbotron = {
      backgroundColor: '#f2f2f2',
      WebkitBackgroundSize: 'cover',
      MozBackgroundSize: 'cover',
      OBackgroundSize: 'cover',
      backgroundSize: 'cover',
      borderRadius: '0',
    };

    return (
      <div>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          image={this.state.image}
          inputProfile={this.inputProfile}
        />

        <div className="container">
          <div className="row">
            <div
              className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6"
              style={{ margin: '0 auto', float: 'none' }}
            >
              <div className="my-2 text-center">
                <span>{this.props.profile.bio}</span>
              </div>
              <div className="text-center my-2">
                <Stats
                  username={this.props.username}
                  followers={this.props.followers}
                  following={this.props.following}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 pb-0 pt-0"
              style={{ margin: '0 auto', float: 'none' }}
            >
              <div
                className=" m-0 p-0"
                style={{ width: '100%', maxWidth: '100%' }}
              >
                <div className="row home-trades">
                  <div
                    className="col-12 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
                    style={{ padding: '0.05rem' }}
                  >
                    <Nav username={this.props.username} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProfilePictureChange ref="profileChanger" />

          {this.props.children}
        </div>

        {/*{this.props.children*/}
      </div>
    );
  }
}
