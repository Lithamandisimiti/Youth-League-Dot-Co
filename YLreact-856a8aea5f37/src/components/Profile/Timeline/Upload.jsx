import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-responsive-modal';
import Button from '../../Common/Button/Button.jsx';
import Spinner from '../../Common/Spinner/Spinner.jsx';
import Categories from './Categories.jsx';

import { connect } from 'react-redux';
import {
  category,
  createPost,
  openPostingModal,
} from '../../../redux/actions/actions';

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileType = this.onFileType.bind(this);
    this.postCategories = this.postCategories.bind(this);
    this.uploadPost = this.uploadPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      open: false,
      showTextErr: false,
      fileType: '',
      file: '',
      audioCoverFile: null,
      input: null,
      postCategories: [],
      preview: '/file.png',
      title: '',
      description: '',
      imageStyle: { opacity: 0.5 },
      song: '',
      artist: '',
      album: '',
    };
    this.props.category(1);
  }
  postCategories(catid) {
    const postCategories = this.state.postCategories,
      pos = postCategories.indexOf(catid);
    if (pos >= 0) {
      postCategories.splice(pos, 1);
    } else {
      postCategories.push(catid);
    }
    this.setState({ postCategories });
  }
  handleInputChange(e) {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value,
      showTextErr: false,
    });
  }

  onFileType(type) {
    this.setState({
      fileType: type,
    });
  }

  openModal() {
    this.props.openPostingModal(true);
    this.setState({
      open: true,
    });
  }

  onCloseModal() {
    this.props.openPostingModal(false);
    this.setState({
      open: false,
      fileType: '',
      file: '',
      preview: '/file.png',
      imageStyle: { opacity: 0.5 },
      postCategories: [],
      audioCoverFile: null,
      showTextErr: false,
      title: '',
      description: '',
      album: '',
      artist: '',
      song: '',
    });
  }
  uploadPost() {
    const {
      title,
      fileType,
      input,
      file,
      description,
      postCategories,
      audioCoverFile,
      song,
      artist,
      album,
    } = this.state;
    if (title.length > 0) {
      this.setState({
        showTextErr: false,
        title: '',
        description: '',
        file: '',
        fileType: '',
        postCategories: [],
        audioCoverFile: null,
        song: '',
        artist: '',
        album: '',
      });
      this.props.createPost({
        type: fileType,
        file,
        title,
        description,
        categories: postCategories,
        audioCoverFile,
        song,
        artist,
        album,
      });
    } else {
      this.setState({ showTextErr: true });
    }
  }

  onFileChange(e, cover) {
    const t = this;
    e.preventDefault();
    this.openModal();
    const reader = new FileReader();
    const file = e.target.files[0];
    const input = e.target;
    if (file) {
      reader.onloadend = () => {
        if (this.state.fileType === 'image' && !cover) {
          this.setState({
            file: file,
            preview: reader.result,
            input,
            imageStyle: { opacity: 1 },
          });
        } else if (this.state.fileType === 'video' && !cover) {
          let _CANVAS = document.createElement('canvas'), //.querySelector("#video-canvas"),
            _CTX = _CANVAS.getContext('2d'),
            _VIDEO = document.createElement('video'),
            _VIDEOSOURCE = document.createElement('source'),
            prev,
            self = this;
          // Object Url as the video source
          _VIDEOSOURCE.setAttribute('src', URL.createObjectURL(file));
          _VIDEO.appendChild(_VIDEOSOURCE);
          // Load the video and show it
          _VIDEO.load();

          _VIDEO.onloadedmetadata = function() {
            _VIDEO.currentTime = _VIDEO.duration / 3;
            _CANVAS.width = _VIDEO.videoWidth;
            _CANVAS.height = _VIDEO.videoHeight;
            _CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight);

            _VIDEO.addEventListener('canplaythrough', function() {
              _CTX.drawImage(
                _VIDEO,
                0,
                0,
                _VIDEO.videoWidth,
                _VIDEO.videoHeight,
              );
              prev = _CANVAS.toDataURL();
              self.setState({
                file: file,
                preview: prev,
                input,
                imageStyle: { opacity: 1 },
              });
            });
          };
        } else if (this.state.fileType == 'audio' && !cover) {
          this.setState({
            file: file,
            input,
          });
        } else if (cover) {
          this.setState({
            audioCoverFile: file,
            preview: reader.result,
            imageStyle: { opacity: 1 },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  addCover() {
    this.refs.coverImageInput.click();
  }

  render() {
    const ifs = {
      fontSize: '1.5rem',
    };
    const bl = {
      borderLeft: '1px solid whitesmoke',
    };
    const br = {
      borderRight: '1px solid whitesmoke',
    };
    const inputErr = this.state.showTextErr
      ? { outline: 'solid', outlineWidth: '0.8px', outlineColor: 'red' }
      : null;

    return (
      <div className="row text-center mt-2">
        <span className="col-4" style={br}>
          <Link className="a-nav" activeClassName="a-nav-active" to="">
            <div className="ion-ios-camera-outline upload-icon" style={ifs}>
              <input
                type="file"
                accept="image/*"
                name="file"
                id="image"
                className="file-input"
                onChange={e => this.onFileChange(e)}
                onClick={e => {
                  e.target.value = '';
                  this.onFileType('image');
                }}
              />
            </div>
          </Link>
        </span>
        <span className="col-4">
          <Link className="a-nav" activeClassName="a-nav-active" to="">
            <div className="ion-ios-videocam-outline upload-icon" style={ifs}>
              <input
                type="file"
                accept="video/*"
                name="file"
                id="video"
                className="file-input"
                onChange={e => this.onFileChange(e)}
                onClick={e => {
                  e.target.value = '';
                  this.onFileType('video');
                }}
              />
            </div>
          </Link>
        </span>
        <span className="col-4" style={bl}>
          <Link className="a-nav" activeClassName="a-nav-active" to="">
            <div className="ion-ios-musical-notes upload-icon" style={ifs}>
              <input
                type="file"
                accept="audio/*"
                name="file"
                id="audio"
                className="file-input"
                onChange={e => this.onFileChange(e)}
                onClick={e => {
                  e.target.value = '';
                  this.onFileType('audio');
                }}
              />
            </div>
          </Link>
        </span>
        <Modal
          open={this.props.isOpenModal}
          onClose={this.onCloseModal}
          little
          classNames={{
            overlay: 'modal-overlay',
            modal: 'custom-modal',
            closeIcon: 'modal-close-icon',
          }}
        >
          <div className="upload">
            <div className="preview">
              <h1 className="heading-type">{this.state.fileType}.</h1>
              {this.state.fileType == 'audio' && (
                <div className="preview-audio-controls">
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    name="file"
                    ref="coverImageInput"
                    id="cover-image-input"
                    onClick={e => (e.target.value = '')}
                    onChange={e => this.onFileChange(e, true)}
                  />
                  <Button onClick={this.addCover.bind(this)} text="Add Cover" />
                </div>
              )}
              <img src={this.state.preview} style={this.state.imageStyle} />
              <p>{this.state.file.name}</p>
            </div>
            <div className="preview-desc">
              {this.state.fileType === 'audio' && (
                <input
                  type="text"
                  name="song"
                  style={inputErr}
                  onChange={this.handleInputChange}
                  placeholder="Song"
                />
              )}
              {this.state.fileType === 'audio' && (
                <input
                  type="text"
                  name="artist"
                  style={inputErr}
                  onChange={this.handleInputChange}
                  placeholder="Artists"
                />
              )}
              {this.state.fileType === 'audio' && (
                <input
                  type="text"
                  name="album"
                  style={inputErr}
                  onChange={this.handleInputChange}
                  placeholder="Album"
                />
              )}
              <input
                type="text"
                name="title"
                style={inputErr}
                onChange={this.handleInputChange}
                placeholder="Title"
              />
              <textarea
                wrap="soft"
                name="description"
                onChange={this.handleInputChange}
                placeholder="Desciption"
              ></textarea>
              <div className="categories-holder row text-center mt-2">
                <p className="categories-header">Categories</p>
                {this.props.isCategoryPending && (
                  <Spinner containerStyle={{ width: '100%' }} />
                )}
                {this.props.isCategorySuccess && (
                  <Categories
                    categories={this.props.categories}
                    selecting={this.postCategories}
                  />
                )}
              </div>
              {this.props.isPosting && <Spinner />}
              {!this.props.isPosting && (
                <Button onClick={this.uploadPost} type="submit" text="Upload" />
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.category,
    isCategoryPending: state.category.isCategoryPending,
    isCategorySuccess: state.category.isCategorySuccess,
    categoryError: state.category.categoryError,
    categoryFailure: state.category.categoryFailure,
    isOpenModal: state.uploads.isOpenModal,
    isPosting: state.uploads.isPosting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    category: id => dispatch(category(id)),
    createPost: ({
      type,
      file,
      title,
      description,
      categories,
      audioCoverFile,
      song,
      artist,
      album,
    }) =>
      dispatch(
        createPost({
          type,
          file,
          title,
          description,
          categories,
          audioCoverFile,
          song,
          artist,
          album,
        }),
      ),
    openPostingModal: state => dispatch(openPostingModal(state)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload);
