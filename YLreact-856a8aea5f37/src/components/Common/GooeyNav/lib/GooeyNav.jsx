import PropTypes from 'prop-types';
import React from 'react';
import assign from 'object-assign';
import baseCss from './style/index';

import MenuOpenButton from './MenuOpenButton';
import MenuItem from './GooeyNavItem';
import Modal from 'react-responsive-modal';
import Button from '../../Button/Button';
import Spinner from '../../Spinner/Spinner.jsx';
import { _isMobile } from '../../Validate/validate';
import Categories from '../../../Profile/Timeline/Categories';
import DisplayError from '../../Error/DisplayError';

import { connect } from 'react-redux';
import {
  category,
  createPost,
  openNavPostingModal,
} from '../../../../redux/actions/actions';

class GooeyNav extends React.Component {
  constructor(p) {
    super(p);

    this.state = {
      isOpen: false,
      //"modal"
      showTextErr: false,
      fileType: '',
      file: '',
      parentTop: document.querySelector(`.${p.uploadFrom}-feed`)
        ? document
            .querySelector(`.${p.uploadFrom}-feed`)
            .getBoundingClientRect().top
        : window.scrollTop,
      audioCoverFile: null,
      input: null,
      postCategories: [],
      postCategoriesErr: '',
      preview: '/file.png',
      title: '',
      description: '',
      canChange: true,
      imageStyle: { opacity: 0.5 },
      album: '',
      artist: '',
      song: '',
    };
    this.onOpenChanged = this.onOpenChanged.bind(this);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.gooScroll = this.gooScroll.bind(this);
    //"modal"
    this.openModal = this.openModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileType = this.onFileType.bind(this);
    this.postCategories = this.postCategories.bind(this);
    this.uploadPost = this.uploadPost.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.props.category(1);
  }

  static propTypes = {
    menuItems: PropTypes.array,
    orientation: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  };

  static defaultProps = {
    orientation: 'bottom',
    foregroundColor: '#ffc107',
    backgroundColor: '#009688',
    openDistance: '105px',
    openingAngle: Math.PI * 2,
    uploadFrom: 'home',
    menuItems: [
      {
        title: 'image',
        className: 'ion-ios-camera-outline',
      },
      {
        title: 'video',
        className: 'ion-ios-videocam-outline',
      },
      {
        title: 'audio',
        className: 'ion-ios-musical-notes',
      },
    ],
  };

  componentDidMount() {
    document.addEventListener('scroll', this.gooScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.gooScroll);
  }

  gooScroll() {
    this.setState({
      parentTop: document.querySelector(`.${this.props.uploadFrom}-feed`)
        ? document
            .querySelector(`.${this.props.uploadFrom}-feed`)
            .getBoundingClientRect().top
        : window.scrollTop,
    });
  }

  menuCss() {
    const width = 'auto';
    const height = `${50 * (this.props.menuItems.length + 1) + 10}px`;
    const direction = 'rtl',
      right = '10px',
      top = _isMobile() ? '4.5rem' : '6.5rem',
      zIndex = 1030,
      position = 'fixed';

    const css = baseCss.menu;
    // css.writeable=true
    return assign({}, baseCss.menu, {
      position,
      width,
      height,
      direction,
      right,
      top,
      zIndex,
    });
  }

  onOpenChanged(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  postCategories(catid) {
    const { postCategories } = this.state,
      pos = postCategories.indexOf(catid);

    if (pos >= 0) {
      postCategories.splice(pos, 1);
    } else {
      postCategories.push(catid);
    }

    const validationUpdate = {};
    if (!postCategories.length) {
      validationUpdate.postCategoriesErr =
        'Please select at least one category';
    } else {
      validationUpdate.postCategoriesErr = '';
    }

    this.setState({ postCategories, ...validationUpdate });
  }

  handleInputChange(e) {
    const name = e.target.name;

    this.setState({
      [name]: e.target.value,
      showTextErr: false,
    });
  }

  onFileType(type) {
    this.setState(
      {
        fileType: type,
      },
      () => this.refs.fileInput.click(),
    );
  }

  openModal() {
    this.onOpenChanged();
    this.props.openNavPostingModal(true);
    this.setState({
      open: true,
    });
  }

  onCloseModal() {
    this.props.openNavPostingModal(false);
    this.setState({
      open: false,
      fileType: '',
      file: '',
      preview: '/file.png',
      imageStyle: { opacity: 0.5 },
      postCategories: [],
      postCategoriesErr: '',
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
      album,
      artist,
    } = this.state;

    if (this.validatePost()) {
      this.setState({
        showTextErr: false,
        title: '',
        description: '',
        file: '',
        fileType: '',
        postCategories: [],
        postCategoriesErr: '',
        audioCoverFile: null,
        song: '',
        album: '',
        artist: '',
      });

      this.props.createPost({
        type: fileType,
        file,
        title,
        description,
        categories: postCategories,
        audioCoverFile,
        uploadFrom: this.props.uploadFrom,
        song,
        artist,
        album,
      });
    } else {
      this.setState({ showTextErr: true });
    }
  }

  validatePost() {
    const { title, postCategories } = this.state;
    let isValid = true;

    if (title.length <= 1) {
      isValid = false;
    }

    if (!postCategories || !postCategories.length) {
      isValid = false;
      this.setState({
        postCategoriesErr: 'Please select at least one category',
      });
    } else {
      this.setState({ postCategoriesErr: '' });
    }

    return isValid;
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
    document.querySelector('#cover-image-input').click();
  }

  getMenuItems() {
    return this.props.menuItems.map((menuItem, i) => {
      return (
        <MenuItem
          key={i}
          orientation={this.props.orientation}
          revealed={this.state.isOpen}
          position={i + 1}
          title={menuItem.title}
          onClick={() => this.onFileType(menuItem.title)}
          className={menuItem.className}
        />
      );
    });
  }
  svg() {
    return (
      <svg
        id="gooey-nav-svg"
        style={{ display: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey-nav-shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey-nav-goo"
            />
            <feGaussianBlur
              in="gooey-nav-goo"
              stdDeviation="3"
              result="shadow"
            />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite
              in2="shadow"
              in="gooey-nav-goo"
              result="gooey-nav-goo"
            />
            <feComposite in2="gooey-nav-goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="gooey-nav-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey-nav-goo"
            />
            <feComposite in2="gooey-nav-goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    );
  }

  render() {
    const { persistant = false } = this.props;

    return (
      <nav style={this.menuCss()}>
        {this.svg()}
        <input
          type="file"
          style={{ display: 'none' }}
          ref="fileInput"
          accept={`${this.state.fileType}/*`}
          name="file"
          id={`${this.state.fileType}`}
          className="file-input"
          onChange={e => {
            this.onFileChange(e);
          }}
          onClick={e => {
            e.target.value = '';
          }}
        />
        {(this.state.parentTop < 25 || persistant) && (
          <div>
            <MenuOpenButton
              ref="menuOpenButton"
              onOpenChanged={this.onOpenChanged}
            />
            {this.getMenuItems()}
          </div>
        )}
        <Modal
          open={this.props.isOpenNavModal}
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
                  style={
                    this.state.showTextErr
                      ? {
                          outline: 'solid',
                          outlineWidth: '0.8px',
                          outlineColor: 'red',
                        }
                      : null
                  }
                  onChange={this.handleInputChange}
                  placeholder="Song"
                />
              )}
              {this.state.fileType === 'audio' && (
                <input
                  type="text"
                  name="artist"
                  style={
                    this.state.showTextErr
                      ? {
                          outline: 'solid',
                          outlineWidth: '0.8px',
                          outlineColor: 'red',
                        }
                      : null
                  }
                  onChange={this.handleInputChange}
                  placeholder="Artists"
                />
              )}
              {this.state.fileType === 'audio' && (
                <input
                  type="text"
                  name="album"
                  style={
                    this.state.showTextErr
                      ? {
                          outline: 'solid',
                          outlineWidth: '0.8px',
                          outlineColor: 'red',
                        }
                      : null
                  }
                  onChange={this.handleInputChange}
                  placeholder="Album"
                />
              )}
              <input
                type="text"
                name="title"
                style={
                  this.state.showTextErr
                    ? {
                        outline: 'solid',
                        outlineWidth: '0.8px',
                        outlineColor: 'red',
                      }
                    : null
                }
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
                {this.state.postCategoriesErr && (
                  <DisplayError message={this.state.postCategoriesErr} />
                )}
              </div>
              {this.props.isPosting && <Spinner />}
              {!this.props.isPosting && (
                <Button onClick={this.uploadPost} type="submit" text="Upload" />
              )}
            </div>
          </div>
        </Modal>
      </nav>
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
    isOpenNavModal: state.uploads.isOpenNavModal,
    isPosting: state.uploads.isPosting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    category: id => dispatch(category(id)),
    createPost: data => dispatch(createPost(data)),
    openNavPostingModal: state => dispatch(openNavPostingModal(state)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GooeyNav);
