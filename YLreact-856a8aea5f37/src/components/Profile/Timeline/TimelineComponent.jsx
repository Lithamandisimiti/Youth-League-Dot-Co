import React from 'react';

import { connect } from 'react-redux';
import { posts } from '../../../redux/actions/actions';

import Spinner from '../../Common/Spinner/Spinner.jsx';
import Post from '../../Common/Post/Post.jsx';
import GooeyNav from '../../Common/GooeyNav';
import NoData from '../../Common/NoData/NoData';
import Error from '../../Common/Error/Error';
import Blog from './Blog';
import Upload from './Upload';
import { PostTypes } from '../../../helpers/constants';
import { ErrorMessages } from '../../../constants';

import './timeline.css';

class Add extends React.Component {
  render() {
    return (
      <div className="">
        <Upload />
        <Blog />
      </div>
    );
  }
}

class Posts extends React.Component {
  componentDidMount() {
    //this.props.category(2);
  }

  render() {
    const posts = this.props.posts.map(function(post, i) {
      return <Post key={i} post={post} />;
    });

    return (
      <div className="profile-feed">
        {posts.length ? posts : <NoData message="No posts to show" />}
      </div>
    );
  }
}

class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.params.username,
      id: localStorage.getItem('userId'),
    };
  }

  componentDidMount() {
    this.props.posts(PostTypes.USER, this.state.username);
  }

  render() {
    const {
      data,
      isPostsPending,
      isLoggedIn,
      isPostsSuccess,
      postsError,
      postsFailure,
    } = this.props;

    return (
      <div className="">
        <div className="row">
          <div
            className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6"
            style={{ margin: '0 auto', float: 'none' }}
          >
            {this.state.username === localStorage.getItem('userName') && (
              <Add />
            )}
            {isLoggedIn && (
              <GooeyNav orientation="bottom" uploadFrom="profile" />
            )}
            {isPostsPending && <Spinner />}
            {isPostsSuccess && <Posts posts={data} />}
            {postsError && (
              <Error message={ErrorMessages.generalErrorMessage} />
            )}
            {postsFailure && <Error message={ErrorMessages.connectionError} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.posts.posts,
    isPostsPending: state.posts.isPostsPending,
    isPostsSuccess: state.posts.isPostsSuccess,
    postsError: state.posts.postsError,
    postsFailure: state.posts.postsFailure,
    isLoggedIn: state.authenticate.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //reset: () => dispatch(reset()),
    posts: (url, username) => dispatch(posts(url, username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelineComponent);
