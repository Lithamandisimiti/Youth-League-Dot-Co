import React from 'react';
import { connect } from 'react-redux';
import { createBlogPost, BlogPosted } from '../../../redux/actions/actions';

import Spinner from '../../Common/Spinner/Spinner';
import Button from '../../Common/Button/Button';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: '',
    };
    this.onBlogChange = this.onBlogChange.bind(this);
  }
  componentDidMount() {
    //window.scrollTo(0,0);
    //alert(this.state.blog)
  }

  onBlogChange(e) {
    this.setState(
      {
        blog: e.target.value,
      },
      function() {
        //alert(this.state.blog)
        //if (this.state.blog == '') browserHistory.push('/explore')
        //else if (this.state.blog != '') browserHistory.push('/blog/people/' + this.state.blog)
      },
    );
  }
  BlogPosted() {
    this.setState({ blog: '' });
    this.props.BlogPosted(false);
  }

  render() {
    return (
      <div className="form-r>ow my-2">
        <div className="col-sm-12 px-0">
          <div className="form-group mb-sm-2 mb-2">
            <textarea
              type="text"
              name="name"
              rows="4"
              className="form-control"
              autoComplete="off"
              placeholder="Whats on your mind?"
              value={this.state.blog}
              onChange={this.onBlogChange}
              style={{
                fontSize: 'inherit',
                borderRight: 'none',
                borderLeft: 'none',
                borderRadius: '0px',
              }}
            ></textarea>
          </div>
        </div>
        <div className="col-sm-12 px-0">
          {this.props.isPostingBlog && (
            <Spinner
              containerStyle={{ float: 'right' }}
              style={{ width: '20px' }}
            />
          )}
          {this.props.isPostedBlog && this.BlogPosted()}
          {/* {!this.props.isPostingBlog && <button  className="float-right">Post Blog</button>} */}
          {!this.props.isPostingBlog && (
            <Button
              text="Post Blog"
              disabled={false}
              onClick={() => {
                this.state.blog.length > 0
                  ? this.props.createBlogPost(this.state.blog)
                  : null;
              }}
              styles={{
                float: 'right',
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
          )}
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isPostingBlog: state.uploads.isPostingBlog,
    isPostedBlog: state.uploads.isPostedBlog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createBlogPost: blog => dispatch(createBlogPost(blog)),
    BlogPosted: blog => dispatch(BlogPosted(blog)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog);
