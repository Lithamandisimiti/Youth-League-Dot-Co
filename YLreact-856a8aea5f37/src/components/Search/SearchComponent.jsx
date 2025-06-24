import React from 'react';
import { Link, browserHistory } from 'react-router';

const bl = {
  borderLeft: '1px solid whitesmoke',
  //color: 'rgba(0,0,0,.5)'
};

const br = {
  borderRight: '1px solid whitesmoke',
};

class Search extends React.Component {
  render() {
    return (
      <div className="row">
        <span className="col-4" style={br}>
          <b>
            <Link
              className="a-nav"
              activeClassName="a-nav-active"
              to="/explore"
            >
              Explore
            </Link>
          </b>
        </span>
        <span className="col-4">
          <Link
            className="a-nav"
            activeClassName="a-nav-active"
            to="/categories"
          >
            <b>Categories</b>
          </Link>
        </span>
        <span className="col-4" style={bl}>
          <Link className="a-nav" activeClassName="a-nav-active" to="/discover">
            <b>Discover</b>
          </Link>
        </span>
        {/* <span className="col-3" style={bl}><Link className="a-nav" activeClassName="a-nav-active" to="/events"><b>Events</b></Link></span> */}
        {/*<hr className="col-12 py-1" />*/}
      </div>
    );
  }
}

class Searching extends React.Component {
  render() {
    return (
      <div className="row">
        <span className="col-4" style={br}>
          <b>
            <Link
              className="a-nav"
              activeClassName="a-nav-active"
              to={'/search/people/' + this.props.term}
            >
              People
            </Link>
          </b>
        </span>
        <span className="col-4">
          <Link
            className="a-nav"
            activeClassName="a-nav-active"
            to="/search/posts/"
          >
            <b>Posts</b>
          </Link>
        </span>
        <span className="col-4" style={bl}>
          <Link
            className="a-nav"
            activeClassName="a-nav-active"
            to="/search/events"
          >
            <b>Events</b>
          </Link>
        </span>
      </div>
    );
  }
}

export default class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: props.params.term ? props.params.term : '',
      //para: props.params.term
    };
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  componentDidMount() {
    //window.scrollTo(0,0);
    //alert(this.state.search)
  }

  onSearchChange(e) {
    this.setState(
      {
        search: e.target.value,
      },
      function() {
        //alert(this.state.search)
        if (this.state.search === '') browserHistory.push('/explore');
        else if (this.state.search !== '')
          browserHistory.push('/search/people/' + this.state.search);
      },
    );
  }

  render() {
    return (
      <div>
        <div className="container mt-4">
          <div className="row">
            <form
              className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 mb-3"
              style={{ margin: '0 auto', float: 'none' }}
            >
              <div className="form-row">
                <div className="col-sm-12">
                  <div className="form-group mb-sm-2 mb-2">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Search"
                      value={this.state.search}
                      onChange={this.onSearchChange}
                      style={{ fontSize: 'inherit' }}
                    />
                  </div>
                </div>
                <div className="col-sm-12 text-center">
                  {// eslint-disable-next-line
                  this.state.search == (null | '') && <Search />}
                  {// eslint-disable-next-line
                  this.state.search != (null | '') && (
                    <Searching term={this.state.search} />
                  )}
                </div>
              </div>
            </form>
          </div>

          {/*<div className="text-center">
    <svg className="spinner" viewBox="0 0 50 50">
      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="1.5"></circle>
    </svg>                    
</div>*/}

          {this.props.children}
        </div>
      </div>
    );
  }
}
