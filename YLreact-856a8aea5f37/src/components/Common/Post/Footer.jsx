import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Spinner from '../Spinner/Spinner';
import Description from './Description';
import { decode } from 'he';

import {
  likePost,
  unlikePost,
  comments,
  api,
  fetch,
  queryString,
} from '../../../redux/actions/actions';

class Comment extends React.Component {
  render() {
    return (
      <p className="col-12">
        <b
          style={{ cursor: 'pointer' }}
          onClick={() => browserHistory.push(`/${this.props.comment.name}`)}
        >
          {this.props.comment.name}
        </b>{' '}
        {this.props.comment.comment}
      </p>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: props.post_id,
      comments: [],
      lo: 'lo',
    };
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    this._ismounted = true;
    this.getComments();
  }

  getComments() {
    //alert('comments')
    const data = {
      post_id: this.state.post_id,
      from: 0,
      limit: 4,
    };
    fetch(api + 'api/get-comments.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        //alert(response);
        if (response.length !== 0 && this._ismounted) {
          this.setState({ comments: response.reverse() });
        } else {
          //let message = new Error('incorrect email or password');
        }
      });
    //.catch(error => dispatch(setCommentsFailure(error)));
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const comments = this.props.comments.map(function(comment, i) {
      return <Comment key={i} comment={comment} />;
    });

    return <div className="post-comments">{comments}</div>;
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
    let liked;
    props.post.liked === 'false' ? (liked = false) : (liked = true);
    this.state = {
      source: props.source,
      numLikes: parseInt(props.post.likes),
      liked,
      likeClass: '',
      likeLoading: false,
      comment: '',
      comments: [],
    };

    this.likePost = this.likePost.bind(this);
    this.commentPost = this.commentPost.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  UNSAFE_componentWillMount() {
    if (this.props.post.liked === 'false') {
      this.setState({ likeClass: 'ion-ios-star-outline' });
    } else {
      this.setState({ likeClass: 'ion-ios-star' });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn !== this.state.isLoggedIn) {
      if (this.props.post.liked === 'false') {
        this.setState({ likeClass: 'ion-ios-star-outline' });
      } else {
        this.setState({ likeClass: 'ion-ios-star' });
      }
    }
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    const data = {
      post_id: this.props.post.post_id,
      from: 0,
      limit: 4,
    };
    fetch(api + 'api/get-comments.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response.length !== 0) {
          this.setState({ comments: response.reverse() });
        } else {
          //let message = new Error('incorrect email or password');
        }
      })
      .catch(error => console.error(error));
  }

  inputChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }

  commentPost() {
    const { comment } = this.state;
    const userId = localStorage.getItem('userId');
    const postId = this.props.post.post_id;

    if (comment !== '') {
      fetch(`${api}api/comment.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          id: userId,
          post_id: postId,
          comment: comment,
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response === true) {
            this.getComments();
            this.setState({
              comment: '',
            });
          }
        })
        .catch(error => console.error('comment error:', error));
    }
  }

  likePost() {
    let currLikeCount = this.state.numLikes;
    const liked = this.state.liked;
    let likeClass = this.state.likeClass;

    if (this.props.socket.connected && this.props.isLoggedIn) {
      const apiString = liked ? 'unlike.php' : 'like.php';
      //alert(`like:${liked}, now to:${apiString} `)
      const userId = localStorage.getItem('userId');
      const postId = this.props.post.post_id;
      const self = this;
      this.setState({ likeLoading: true });

      fetch(`${api}api/${apiString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          id: userId,
          post_id: postId,
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            if (!liked) {
              likeClass = 'ion-ios-star';
              currLikeCount += 1;
              self.props.likePost(self.props.post);
            } else {
              currLikeCount -= 1;
              likeClass = 'ion-ios-star-outline';
              self.props.unlikePost(self.props.post);
            }
          }
          self.setState({
            numLikes: currLikeCount,
            liked: !liked,
            likeClass: likeClass,
            likeLoading: false,
          });
        })
        .catch(error => console.error('event error:', error));
    }
    //call redux method for liking.
  }

  render() {
    return (
      <div className="col-12  px-0 px-sm-1 px-md-2">
        <div className="post-footer pt-2 pb-2 d-flex align-items-center">
          {this.state.likeLoading && (
            <Spinner style={{ width: '1em', height: '1em', marginRight: 28 }} />
          )}
          {!this.state.likeLoading && (
            // <div>
            <span
              className={this.state.likeClass}
              onClick={this.likePost}
              style={{ fontSize: '1.5em', marginRight: 10, fontFamily: 'Lato' }}
            >
              <span style={{ fontFamily: 'Lato', fontSize: '0.8em' }}>
                &nbsp;
                {this.state.numLikes}
              </span>
            </span>
          )
          // </div>
          }
          <span className="fa fa-comment" style={{ fontSize: '1.3em' }}>
            <span style={{ fontFamily: 'Lato', fontSize: '0.8em' }}>
              &nbsp;Comment
            </span>
          </span>
          {/* <span className="icon ion-md-more col-1" style={{float:'right', fontSize:'2em', cursor:'pointer'}}></span> */}
        </div>
        {this.props.post.status !== 'blog' && (
          <div className="post-desc">
            <h2 className="col-12 col-sm-6">{decode(this.props.post.title)}</h2>
            <Description
              className="col-12 col-sm-6"
              description={this.props.post.description}
            />
          </div>
        )}
        <Comments comments={this.state.comments} />
        {/*No comments count from the backend*/}
        {/*<div  className="more-comments">
                    <span>7 more comments</span>
                </div>*/}
        <div className="comment-input">
          <input
            className="col-10 form-control"
            type="text"
            placeholder="What's your comment"
            style={{ borderRadius: '0' }}
            onChange={this.inputChange}
            value={this.state.comment}
          />
          <span className="col-2" style={{ cursor: 'pointer' }}>
            <span
              className="icon ion-md-send"
              onClick={this.commentPost}
              style={{ fontSize: '1.2em' }}
            ></span>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authenticate.isLoggedIn,
    likePostSuccess: state.posts.likePostSuccess,
    likePostPending: state.posts.likePostPending,
    likePostFailure: state.posts.likePostFailure,
    unlikePostSuccess: state.posts.unlikePostSuccess,
    unlikePostPending: state.posts.unlikePostPending,
    unlikePostFailure: state.posts.unlikePostFailure,
    socket: state.notifications.socket,
    data: state.comments.comments,
    isCommentsPending: state.comments.isCommentsPending,
    isCommentsSuccess: state.comments.isCommentsSuccess,
    commentsError: state.comments.commentsError,
    commentsFailure: state.comments.commentsFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    likePost: postID => dispatch(likePost(postID)),
    unlikePost: postID => dispatch(unlikePost(postID)),
    comments: (post_id, fromC, limit) =>
      dispatch(comments(post_id, fromC, limit)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Footer);
