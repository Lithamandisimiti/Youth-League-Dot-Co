import React from 'react';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { logout } from '../../../redux/actions/actions';
import { Colors } from '../../../constants';

export class Opt extends React.Component {
  render() {
    return (
      <div>
        <div className="p-2 pt-0">
          <span>
            <b>{this.props.name}</b>
          </span>
        </div>
      </div>
    );
  }
}

export class Heading extends React.Component {
  render() {
    const bgc = {
      color: Colors.dustGray,
      backgroundColor: Colors.alabaster,
      borderTop: `1px solid ${Colors.whiteSmoke}`,
    };

    return (
      <div>
        {/*<hr className="py-1 my-1" />*/}
        <div className="p-2" style={bgc}>
          <span>{this.props.heading}</span>
        </div>
      </div>
    );
  }
}

class ReviewReal extends React.Component {
  render() {
    const bt = {
      borderTop: `1px solid ${Colors.whiteSmoke}`,
      cursor: 'pointer',
    };

    const fsnb2em = {
      fontSize: '1em',
      color: 'rgb(153, 153, 153)',
    };

    return (
      <div onClick={() => browserHistory.push(this.props.url)}>
        {/*<hr className="py-1 my-1" />*/}
        <div className="p-2" style={bt}>
          <span>{this.props.action}</span>
          <span
            className="ion-ios-arrow-right float-right pr-2"
            style={fsnb2em}
          />
        </div>
      </div>
    );
  }
}

class Last extends React.Component {
  render() {
    const bt = {
      borderTop: `1px solid ${Colors.whiteSmoke}`,
      borderBottom: `1px solid ${Colors.whiteSmoke}`,
      cursor: 'pointer',
    };

    const fsnb2em = {
      fontSize: '1em',
      color: Colors.dustGray,
    };

    return (
      <div onClick={() => browserHistory.push(this.props.url)}>
        {/*<hr className="py-1 my-1" />*/}
        <div className="p-2" style={bt}>
          <span>{this.props.action}</span>
          <span
            className="ion-ios-arrow-right float-right pr-2"
            style={fsnb2em}
          />
        </div>
      </div>
    );
  }
}

class Logout extends React.Component {
  render() {
    const bt = {
      borderTop: `1px solid ${Colors.whiteSmoke}`,
      borderBottom: `1px solid ${Colors.whiteSmoke}`,
      cursor: 'pointer',
    };

    const fsnb2em = {
      fontSize: '1em',
      color: Colors.dustGray,
    };

    return (
      <div>
        {/*<hr className="py-1 my-1" />*/}
        <div
          className="p-2 my-4"
          onClick={() => this.props.onClick()}
          style={bt}
        >
          <span style={{ color: 'rgb(224, 36, 94)' }}>Logout</span>
          <span
            className="ion-ios-arrow-right float-right pr-2"
            style={fsnb2em}
          />
        </div>
      </div>
    );
  }
}

class Settings extends React.Component {
  render() {
    return (
      <div className="">
        <Opt name={'Settings'} />
        <Heading heading={'ACCOUNT'} />
        <ReviewReal
          action={'General'}
          url={`/${this.props.username}/settings/general`}
        />
        <ReviewReal
          action={'Blocking'}
          url={`/${this.props.username}/settings/blocking`}
        />
        <ReviewReal
          action={'Security and Login'}
          url={`/${this.props.username}/settings/security`}
        />
        <Heading heading={'ABOUT'} />
        <ReviewReal action={'Location (South Africa)'} />
        <ReviewReal
          action={'Report a Problem'}
          url={`/${this.props.username}/settings/report-problem`}
        />
        <ReviewReal action={'Help Center'} url={'contact'} />
        <Heading heading={'GENERAL'} />
        <ReviewReal
          action={'Terms & Conditions'}
          url={'/terms-and-conditions'}
        />
        <Last action={'Cookie use'} url={'/cookies'} />

        <Logout onClick={() => this.props.onLogout()} />
      </div>
    );
  }
}

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('userName'),
      id: localStorage.getItem('userId'),
    };
  }

  componentDidMount() {
    if (this.state.username !== localStorage.getItem('userName')) {
      browserHistory.push('/' + this.state.username);
    }
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
                <Settings
                  onLogout={() => this.props.logout()}
                  username={this.state.username}
                />
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
    isLoggedIn: state.authenticate.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsComponent);
