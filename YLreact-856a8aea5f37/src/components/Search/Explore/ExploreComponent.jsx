import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { posts } from '../../../redux/actions/actions';
import Spinner from '../../Common/Spinner/Spinner.jsx';
import Post from '../../Common/Post/Post.jsx';
import { GooeyNav } from '../../Common/GooeyNav';
import { PostTypes } from '../../../helpers/constants';
import Error from '../../Common/Error/Error';
import { ErrorMessages } from '../../../constants';

class Posts extends React.Component {
  render() {
    const bt = {
      borderTop: '1px solid whitesmoke',
    };

    const fs = {
      fontSize: '1.5em',
    };

    const posts = this.props.posts.map(function(post, i) {
      return <Post key={i} post={post} />;
    });

    return <div style={bt}>{posts}</div>;
  }
}

class ExploreComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
      id: props.params.term,
      name: props.params.name,
    };
  }

  componentDidMount() {
    this.setState({ isLoggedIn: this.props.isLoggedIn });
    const id = this.state.isLoggedIn ? localStorage.getItem('userId') : -1;
    this.props.posts(PostTypes.HOT, id);
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
            ? localStorage.getItem('userId')
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

    return (
      <div className="explore-feed row">
        <div
          /*className="col-12 col-sm-8 col-sm-offset-4"*/ className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6"
          style={{ margin: '0 auto', float: 'none' }}
        >
          {isPostsPending && <Spinner />}
          {isLoggedIn && <GooeyNav orientation="bottom" uploadFrom="explore" />}
          {isPostsSuccess && (
            <Posts posts={data} id={this.state.id} name={this.state.name} />
          )}
          {postsError && <Error message={ErrorMessages.generalErrorMessage} />}
          {postsFailure && <Error message={ErrorMessages.connectionError} />}
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
)(ExploreComponent);
