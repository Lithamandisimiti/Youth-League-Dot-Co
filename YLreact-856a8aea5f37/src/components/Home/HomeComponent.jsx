import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { posts } from '../../redux/actions/actions';
import Spinner from '../Common/Spinner/Spinner.jsx';
import Post from '../Common/Post/Post.jsx';
import GooeyNav from '../Common/GooeyNav';
import NoData from '../Common/NoData/NoData';
import Error from '../Common/Error/Error';
import { PostTypes } from '../../helpers/constants';
import { ErrorMessages } from '../../constants';

class Posts extends React.Component {
  render() {
    const posts = this.props.posts.map(function(post, i) {
      return <Post key={i} post={post} />;
    });

    return (
      <div className="">
        {posts.length > 0 ? posts : <NoData message="No posts to show" />}
      </div>
    );
  }
}

class TimelineComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: this.props.isLoggedIn });
    const id = this.state.isLoggedIn ? localStorage.getItem('userName') : -1;
    const postType = this.state.isLoggedIn ? PostTypes.ALL : PostTypes.HOT;
    this.props.posts(postType, id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn !== this.state.isLoggedIn) {
      if (!nextProps.isLoggedIn) browserHistory.push('/auth/login');
      this.setState(
        {
          isLoggedIn: nextProps.isLoggedIn,
        },
        function() {
          const id = this.state.isLoggedIn
            ? localStorage.getItem('userName')
            : -1;
          const postType = this.state.isLoggedIn
            ? PostTypes.ALL
            : PostTypes.HOT;
          this.props.posts(postType, id);
        },
      );
    }
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
    const persistantGooey = data && data.length == 0;
    return (
      <div className="home-feed container mt-3">
        <div className="row">
          <div
            /*className="col-12 col-sm-8 col-sm-offset-4"*/ className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6"
            style={{ margin: '0 auto', float: 'none' }}
          >
            {isPostsPending && <Spinner />}
            {isPostsSuccess && <Posts posts={data} />}
            {isLoggedIn && (
              <GooeyNav
                orientation="bottom"
                uploadFrom="home"
                persistant={persistantGooey}
              />
            )}
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
