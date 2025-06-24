import React from 'react';
//import { Router, Route, Link, IndexLink, hashHistory, browserHistory, IndexRoute  } from 'react-router';

import { connect } from 'react-redux';
import { gallery } from '../../../redux/actions/actions';

import Spinner from '../../Common/Spinner/Spinner.jsx';
import NoData from '../../Common/NoData/NoData';
import Error from '../../Common/Error/Error';
import { ErrorMessages } from '../../../constants';

class ImgFig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  render() {
    // eslint-disable-next-line
    let figureImg = {
      //background: 'url("../home.jpg") no-repeat center center'
      //height: '20em',
      background:
        '-webkit-linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1)),url(' +
        this.props.image +
        '),no-repeat center', // eslint-disable-next-line
      background:
        'linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1)),url(' +
        this.props.image +
        '),no-repeat center',
      backgroundPositionX: '0%, 0%, center',
      backgroundPositionY: '0%, 0%, center',
      backgroundSize: 'auto auto, auto auto, auto auto',
      backgroundPosition: '50% 50%', // eslint-disable-next-line
      backgroundSize: 'cover',
      WebkitTransition: 'transform 0.2s linear',
      transition: 'transform 0.2s linear',
      MozTransition: 'transform 0.2s linear',
      OTransition: 'transform 0.2s linear',
      msTransition: 'transform 0.2s linear', // eslint-disable-next-line
      WebkitTransition: '-webkit-transform 0.2s linear',

      display: '-webkit-box', // eslint-disable-next-line
      display: '-moz-box', // eslint-disable-next-line
      display: 'box', // eslint-disable-next-line
      display: '-webkit-flex', // eslint-disable-next-line
      display: '-moz-flex', // eslint-disable-next-line
      display: '-ms-flexbox', // eslint-disable-next-line
      display: 'flex',
      WebkitBoxFlex: '1',
      MmozBoxFlex: '1',
      boxFlex: '1',
      msFlex: '1',
      /*WebkitBoxAlign: 'center',
            MozBoxAlign: 'center',
            BoxAlign: 'center',
            WebkitAlignItems: 'center',
            MozAlignItems: 'center',
            msAlignItems: 'center',
            OAlignItems: 'center',
            alignItems: 'center',
            msFlexAlign: 'center',*/
      padding: '0',
      margin: '0',
    };

    const figureCaption2 = {
      display: 'inline-block',
      //margin: 'auto',
      //padding: '.5em',
      textAlign: 'center',
      textTransform: 'uppercase',
      maxWidth: '80%',
      border: '0',
      font: 'inherit',
      verticalAlign: 'baseline',
      color: '#FFFFFF',
    };

    return (
      <div
        className="col-4 col-sm-4 col-lg-4 px-0 py-0 p-sm-1 p-md-2 gallery-tile-p"
        style={{ padding: '0.05rem' }}
      >
        <figure className="text-center rh" style={figureImg}>
          <figcaption className="figure-caption px-2" style={figureCaption2}>
            <span
              className="ion-ios-camera-outline"
              style={{ fontSize: '1.5em' }}
            ></span>
          </figcaption>
        </figure>
      </div>
    );
  }
}

class Gallery extends React.Component {
  componentDidMount() {
    //this.props.category(2);
  }

  render() {
    const gallery = this.props.gallery.map(function(gallery, i) {
      return <ImgFig key={i} id={gallery.post_id} image={gallery.media_url} />;
    });

    return (
      <div className="">
        <div className="row home-trades">
          {gallery.length ? gallery : <NoData message="Gallery is empty" />}
        </div>
      </div>
    );
  }
}

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.params.username,
      id: props.profile.id,
    };
  }

  componentDidMount() {
    //window.scrollTo(0,0);
    this.props.gallery(this.state.id);
  }

  render() {
    const {
      data,
      isGalleryPending,
      isGallerySuccess,
      galleryError,
      galleryFailure,
    } = this.props;

    return (
      <div className="row">
        <section
          className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 py-0"
          style={{ margin: '0 auto', float: 'none' }}
        >
          {isGalleryPending && <Spinner />}
          {isGallerySuccess && <Gallery gallery={data} />}
          {/*<Gallery />*/}
          {galleryError && (
            <Error message={ErrorMessages.generalErrorMessage} />
          )}
          {galleryFailure && <Error message={ErrorMessages.connectionError} />}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile[0],
    data: state.gallery.gallery,
    isGalleryPending: state.gallery.isGalleryPending,
    isGallerySuccess: state.gallery.isGallerySuccess,
    galleryError: state.gallery.galleryError,
    galleryFailure: state.gallery.galleryFailure,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //reset: () => dispatch(reset()),
    gallery: id => dispatch(gallery(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GalleryComponent);
