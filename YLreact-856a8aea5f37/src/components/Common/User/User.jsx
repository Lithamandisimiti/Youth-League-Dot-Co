import React from 'react';
import { browserHistory } from 'react-router';
import NoData from '../../Common/NoData/NoData';
import Button from '../../Common/Button/Button';
import { nodeHost } from '../../../redux/actions/actions';

export class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: nodeHost + props.user.image,
      following: this.props.user.following,
    };
  }

  onFollow = () => {
    this.props.follow(this.props.user.id, true);
    this.setState({
      following: 'true',
    });
  };

  onUnFollow = () => {
    this.props.follow(this.props.user.id, false);
    this.setState({
      following: 'false',
    });
  };

  onImageError = () => {
    this.setState({ source: `${process.env.PUBLIC_URL}/images/user.jpg` });
  };

  render() {
    const imgStyle = {
      height: '3.5em',
      width: '3.5em',
      objectFit: 'cover',
      borderRadius: '50%',
      backgroundImage: `${process.env.PUBLIC_URL}/images/user.jpg`,
    };

    const bt = {
      borderTop: '1px solid whitesmoke',
    };
    const { following, source } = this.state;

    return (
      <div
        className="py-1 col-lg-12 col-sm-12 col-12 p-sm-1 p-md-2"
        style={{ padding: '0.35rem' }}
      >
        <div className="media">
          <img
            className="align-self-center mr-2"
            onClick={() => browserHistory.push('/' + this.props.user.username)}
            src={source}
            onError={this.onImageError}
            alt={this.props.user.firstname + ' ' + this.props.user.lastname}
            style={imgStyle}
          />
          <div className="media-body py-1" style={bt}>
            <p className="mt-1 mb-0">
              <b
                onClick={() =>
                  browserHistory.push('/' + this.props.user.username)
                }
              >
                {this.props.user.username}
              </b>

              <Button
                text={following === 'true' ? 'Unfollow' : 'Follow'}
                disabled={false}
                onClick={following === 'true' ? this.onUnFollow : this.onFollow}
                styles={{
                  float: 'right',
                  borderRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              />
            </p>
            <p
              className="mb-0"
              onClick={() =>
                browserHistory.push('/' + this.props.user.username)
              }
            >
              {this.props.user.firstname + ' ' + this.props.user.lastname}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export class Users extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.props.category(2);
  }

  render() {
    const users = this.props.users.map((user, i) => {
      return (
        <User key={i} user={user} name={'Art'} follow={this.props.follow} />
      );
    });

    return (
      <div className="row">
        {users.length ? users : <NoData message="No one here..." />}
      </div>
    );
  }
}

export class User2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.user.user_image,
      follow: false,
    };
    this.onFollow = this.onFollow.bind(this);
  }

  onImageError() {
    this.setState({ source: `${process.env.PUBLIC_URL}/images/user.jpg` });
  }

  onFollow = () => {
    this.props.follow(this.props.user.user_id, true);
    this.setState({
      follow: true,
    });
  };

  onUnFollow = () => {
    this.props.follow(this.props.user.user_id, false);
    this.setState({
      follow: false,
    });
  };

  render() {
    const imgStyle = {
      height: '3.5em',
      width: '3.5em',
      objectFit: 'cover',
      borderRadius: '50%',
      backgroundImage: `${process.env.PUBLIC_URL}/images/user.jpg`,
    };

    const bt = {
      borderTop: '1px solid whitesmoke',
    };

    return (
      <div
        className="py-1 col-lg-12 col-sm-12 col-12 p-sm-1 p-md-2"
        style={{ padding: '0.35rem' }}
      >
        <div className="media">
          <img
            className="align-self-center mr-2"
            onClick={() =>
              browserHistory.push('/' + this.props.user.user_username)
            }
            src={this.state.source}
            onError={() => this.onImageError()}
            alt={() => this.onImageError()}
            style={imgStyle}
          />
          <div className="media-body py-1" style={bt}>
            <p className="mt-1 mb-0">
              <b
                onClick={() =>
                  browserHistory.push('/' + this.props.user.user_username)
                }
              >
                {this.props.user.user_username}
              </b>

              <Button
                text={this.state.follow ? 'Unfollow' : 'Follow'}
                disabled={false}
                onClick={this.state.follow ? this.onUnFollow : this.onFollow}
                styles={{
                  float: 'right',
                  borderRadius: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              />
            </p>
            <p
              className="mb-0"
              onClick={() =>
                browserHistory.push('/' + this.props.user.user_username)
              }
            >
              {this.props.user.user_firstname +
                ' ' +
                this.props.user.user_lastname}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export class DiscoverComponet extends React.Component {
  render() {
    return (
      <div className="row">
        <div
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
          style={{ margin: '0 auto', float: 'none' }}
        >
          <div className="row">
            <User name={'Art'} />
            <User name={'Blogging and Writing'} />
            <User name={'Fashion and Design'} />
            <User name={'Video and Photography'} />
            <User name={'Poetry'} />
            <User name={'Music'} />
            <User name={'Beauty and Fitness'} />
            <User name={'Cullinary and Restaurants'} />
          </div>
        </div>
      </div>
    );
  }
}
