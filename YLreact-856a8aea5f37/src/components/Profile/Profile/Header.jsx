import React from 'react';
import { connect } from 'react-redux';
import { nodeHost } from '../../../redux/actions/actions';

import { profile } from '../../../redux/actions/actions';

const imgStyle = { objectFit: 'cover', borderRadius: '50%' };
const jumbotron = {
  backgroundColor: '#f2f2f2',
  WebkitBackgroundSize: 'cover',
  MozBackgroundSize: 'cover',
  OBackgroundSize: 'cover',
  backgroundSize: 'cover',
  borderRadius: '0',
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: nodeHost + props.image,
    };
  }
  onImageError = () => {
    this.setState({ image: `${process.env.PUBLIC_URL}/images/user.png` });
  };

  inputProfile() {
    this.props.inputProfile();
  }

  render() {
    const profile = this.props.data[0];

    return (
      <div className="jumbotron jumbotron-fluid mb-0 py-3" style={jumbotron}>
        <div className="container">
          <div className="text-center" style={{ color: 'black' }}>
            <div className="">
              <img
                className="mt-2 profile-image"
                onClick={() => {
                  this.props.isLoggedIn
                    ? localStorage.getItem('userId') === profile.id
                      ? this.inputProfile()
                      : null
                    : null;
                }}
                src={this.state.image}
                onError={this.onImageError}
                alt="Profile image"
                style={imgStyle}
              />
              <h1
                className="mt-2 mb-0 profile-name"
                style={{ fontWeight: '100' }}
              >
                {profile.firstname} {profile.lastname}
                <span className="profile-dot">.</span>
              </h1>
              <p className="my-1">{profile.location}</p>
              <p className="my-0">@{profile.username}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.profile.profile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profile: username => dispatch(profile(username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
