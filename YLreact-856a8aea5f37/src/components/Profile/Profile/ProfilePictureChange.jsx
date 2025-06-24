import React from 'react';
import Modal from 'react-responsive-modal';
import Cropper from 'react-cropper';
import { connect } from 'react-redux';
import {
  uploadProfilePicture,
  openProfileModal,
} from '../../../redux/actions/actions';
import { _isMobile } from '../../Common/Validate/validate';
import Button from '../../Common/Button/Button';
import Spinner from '../../Common/Spinner/Spinner';
import 'cropperjs/dist/cropper.css';
class ProfilePictureChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      preview:
        'https://youthleague.co:2048/content/images/cc0baf5c885a4513fbd78eb7494e7c75.jpg',
      file: '',
      width: 400,
      height: 400,
    };
    this.openProfileModal = this.openProfileModal.bind(this);
    this.closeProfileModal = this.closeProfileModal.bind(this);
    this.inputProfile = this.inputProfile.bind(this);
    this.saveProfilePicture = this.saveProfilePicture.bind(this);
  }
  onImageError() {
    this.setState({ image: `${process.env.PUBLIC_URL}/images/user.png` });
  }
  openProfileModal() {
    this.props.openProfileModal(true);
    this.setState({
      openModal: true,
    });
  }
  saveProfilePicture() {
    const image = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.props.uploadProfilePicture(image);
  }
  inputProfile() {
    this.refs.profileimageInput.click();
  }
  closeProfileModal() {
    this.props.openProfileModal(false);
    this.setState({
      openModal: false,
    });
  }
  onFileChange(e, cover) {
    e.preventDefault();
    this.openProfileModal();
    const reader = new FileReader();
    const file = e.target.files[0];
    const self = this;

    const input = e.target;
    if (file) {
      reader.onloadend = () => {
        const img = new Image();
        img.onload = function() {
          // alert(this.width + " " + this.height);
          self.setState({
            file: file,
            preview: reader.result,
            width: this.width,
            height: this.height,
          });
        };
        img.src = URL.createObjectURL(file);
      };
      reader.readAsDataURL(file);
    }
  }

  render() {
    const ratio = this.state.height / this.state.width;
    const normalisedHeight = window.innerWidth * 0.75 * ratio;
    const normalisedWidth = 400 / ratio;
    const cropperStyle = _isMobile()
      ? { height: normalisedHeight, width: window.innerWidth * 0.75 }
      : { height: 400, width: normalisedWidth };
    return (
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          name="file"
          ref="profileimageInput"
          id="profile-image-input"
          onClick={e => (e.target.value = '')}
          onChange={e => {
            this.onFileChange(e, true);
          }}
        />
        <Modal
          open={this.props.isOpenProfileModal}
          onClose={this.closeProfileModal}
          little
          classNames={{
            overlay: 'modal-overlay',
            modal: 'custom-profile-modal',
            closeIcon: 'profile-modal-close-icon',
          }}
        >
          <div className="upload-profile">
            <div className="row">
              <div className="crop-holder">
                <Cropper
                  ref="cropper"
                  src={this.state.preview}
                  style={cropperStyle}
                  // Cropper.js options
                  aspectRatio={1}
                  autoCrop={true}
                  guides={false}
                  zoomable={false}
                  crop={() => {}} //TODO: Do something while cropping
                />
                {this.props.isPosting && (
                  <Spinner containerStyle={{ marginTop: '2rem' }} />
                )}
                {!this.props.isPosting && (
                  <Button
                    onClick={() => this.saveProfilePicture()}
                    styles={{
                      minWidth: '150px',
                      marginTop: '2rem',
                      fontSize: '0.75rem',
                    }}
                    text="SAVE"
                  />
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isOpenProfileModal: state.uploads.isOpenProfileModal,
    isPosting: state.uploads.isPosting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadProfilePicture: file => dispatch(uploadProfilePicture(file)),
    openProfileModal: state => dispatch(openProfileModal(state)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(ProfilePictureChange);
