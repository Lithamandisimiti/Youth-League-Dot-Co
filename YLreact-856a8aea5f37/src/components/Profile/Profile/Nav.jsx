import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
    };
  }

  quote() {
    browserHistory.push('/request');
  }

  render() {
    /*let box = {
            WebkitBoxShadow: '0px 0px 2px 0px rgba(42,146,199,0.5)',
            MozBoxShadow: '0px 0px 2px 0px rgba(42,146,199,0.5);',
            boxShadow: 'inset 0px -65px 60px -4px rgba(84,84,84,1)',
        }*/

    let nav = {
      color: '#9a9a9a',
      //borderBottom: '1px solid rgba(213, 213, 213, 0.4)',
      //background: 'url(https://careers.allangray.co.za/Style%20Library/allangray/images/ALG_body_banner.gif) repeat-x left bottom #fff',
      backgroundColor: 'white',
      borderBottom: '1px solid whitesmoke',
      borderTop: '1px solid whitesmoke',
      /*WebkitBoxShadow: '0 1px 3px rgba(41,70,97,.15)',
            MozBoxShadow: '0 1px 3px rgba(41,70,97,.15)',
            boxShadow: '0 1px 3px rgba(41,70,97,.15)',*/
    };

    let fs2em = {
      fontSize: '2em',
      display: 'block',
      lineHeight: '1',
      color: '#9a9a9a',
      //color: 'rgba(0,0,0,.7)'
    };

    let fs085em = {
      fontSize: '0.75em',
      textDecoration: 'none',
      //color: 'inherit'
    };

    return (
      <nav className="navbar sticky-top mb-1 mb-sm-1 text-center" style={nav}>
        <div className="container py-0 px-0">
          <IndexLink
            to={'/' + this.state.username}
            className="a-nav"
            activeClassName="a-nav-active"
            style={fs085em}
          >
            <span className="icon ion-ios-grid" style={fs2em}></span>
            Timeline
          </IndexLink>
          <Link
            to={'/' + this.state.username + '/gallery'}
            className="a-nav"
            activeClassName="a-nav-active"
            style={fs085em}
          >
            <span className="icon ion-ios-images" style={fs2em}></span>
            Gallery
          </Link>
          <Link
            to={'/' + this.state.username + '/about'}
            className="a-nav"
            activeClassName="a-nav-active"
            style={fs085em}
          >
            <span className="ion-ios-personadd-outline" style={fs2em}></span>
            About
          </Link>
          {this.state.username === localStorage.getItem('userName') && (
            <Link
              to={'/' + this.state.username + '/settings'}
              className="a-nav"
              activeClassName="a-nav-active"
              style={fs085em}
            >
              <span className="ion-ios-gear-outline" style={fs2em}></span>
              Settings
            </Link>
          )}
        </div>
      </nav>
    );
  }
}
