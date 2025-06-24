import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';

//import Gallery from '../Search/Explore/ExploreComponent.jsx';

let bl = {
  borderLeft: '1px solid whitesmoke',
  //color: 'rgba(0,0,0,.5)'
};

let br = {
  borderRight: '1px solid whitesmoke',
};

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
    };
  }

  render() {
    let { followers, following } = this.props;
    let { username } = this.state;
    return (
      <div className="row">
        {/* <span className="col-4 px-0" style={br}>
                    <b>
                        <Link 
                            className="a-nav" 
                            activeClassName="a-nav-active" 
                            to={ "/"+ username +"/projects" }
                        >
                            16 Projects
                        </Link>
                    </b>
                </span> */}
        <span className="col-6 px-0">
          <Link
            className="a-nav"
            activeClassName="a-nav-active"
            to={'/' + username + '/followers'}
          >
            <b>
              {followers} Follower{followers > 1 && <span>s</span>}
            </b>
          </Link>
        </span>
        <span className="col-6 px-0" style={bl}>
          <Link
            className="a-nav"
            activeClassName="a-nav-active"
            to={'/' + username + '/following'}
          >
            <b>{following} Following</b>
          </Link>
        </span>
        {/*<hr className="col-12 py-1" />*/}
      </div>
    );
  }
}
