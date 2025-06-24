import React from 'react';
import { browserHistory } from 'react-router';
import Waypoint from 'react-waypoint';

import Footer from './Footer.jsx';
import Description from './Description.jsx';

import './post.css';

import { PlayerComponent, Background, Title, Artwork, Mask } from './styles';
import Controls from './Controls';
import Scrubber from './Scrubber';
import TimeStamps from './TimeStamps';
import TrackInformation from './TrackInformation';
import moment from 'moment-timezone';
import { nodeHost } from '../../../redux/actions/actions';

/**
 * Renders the header of a post
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0,
      image: this.props.image,
    };
  }

  /**
   * Sets the time elapsed for a post
   *
   * @memberof Header
   * @returns {string} The difference between when the post was created and the current date
   */
  setTimeElapsed = () => {
    const { datetime } = this.props;
    const postCreatedTime = moment.tz(datetime, 'Africa/Johannesburg');
    const currentTime = moment().tz('Africa/Johannesburg');

    const differenceInSeconds = currentTime.diff(postCreatedTime, 'seconds');
    const differenceInMinutes = currentTime.diff(postCreatedTime, 'minutes');
    const differenceInHours = currentTime.diff(postCreatedTime, 'hours');
    const differenceInDays = currentTime.diff(postCreatedTime, 'days');
    const differenceInWeeks = currentTime.diff(postCreatedTime, 'weeks');

    if (differenceInSeconds < 59) {
      return `${differenceInSeconds}s`;
    }

    if (differenceInMinutes < 59) {
      return `${differenceInMinutes}m`;
    }

    if (differenceInHours < 24) {
      return `${differenceInHours}h`;
    }

    if (differenceInDays < 7) {
      return `${differenceInDays}d`;
    }

    return `${differenceInWeeks}w`;
  };

  onImageError() {
    this.setState({ image: `${process.env.PUBLIC_URL}/images/user.png` });
  }

  componentDidMount() {
    const ago = this.setTimeElapsed();
    this.setState({ secondsElapsed: ago });
  }

  render() {
    const img = {
      height: '3.5em',
      width: '3.5em',
      objectFit: 'cover',
      borderRadius: '50%',
    };

    const fs2em = {
      color: 'rgba(0,0,0,.5)',
    };

    return (
      <div
        className="py-1 col-lg-12 col-sm-12 col-12 p-sm-1 p-md-2"
        style={{ padding: '0.35rem' }}
      >
        <div className="media">
          <img
            className="align-self-center mr-2"
            onClick={() => browserHistory.push('/' + this.props.username)}
            src={this.state.image}
            alt="Post image"
            onError={() => this.onImageError()}
            style={img}
          />
          <div className="media-body py-1">
            <p className="mt-1 mb-0">
              <b onClick={() => browserHistory.push('/' + this.props.username)}>
                {this.props.username}
              </b>{' '}
              <span className="float-right" style={fs2em}>
                {this.state.secondsElapsed} ago
              </span>
            </p>
            <p
              className="mb-0"
              onClick={() => browserHistory.push('/' + this.props.username)}
            >
              {this.props.name}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class VideoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapper: 'icon ion-ios-play',
      controls: '',
      status: 'paused',
      //source: 'https://scontent-jnb1-1.cdninstagram.com/vp/f03fee9ad6838ffd97a9d78b59e3c9af/5A94F5AC/t50.2886-16/26818721_336121080211641_4860783843738648576_n.mp4',
      source: props.source,
      thumbnail: null,
    };
    this.updateState = this.updateState.bind(this);
    //this.updateTime = this.updateTime.bind(this);
  }

  updateState() {
    if (this.state.status === 'paused') {
      this.refs.vidRef.play();
      this.setState({ wrapper: 'ion ion-pause' });
      this.setState({ status: 'playing' });
      setTimeout(() => {
        this.setState({ wrapper: '' });
      }, 500);
    } else {
      this.refs.vidRef.pause();
      this.setState({ wrapper: 'icon ion-ios-play' });
      this.setState({ status: 'paused' });
    }
  }

  way() {
    if (this.state.status === 'playing') {
      this.updateState();
    }
  }

  onImageError() {
    //alert('error vid')
    this.setState({ wrapper: '' });
    this.setState({ thumbnail: '../no-video.png' });
  }

  render() {
    return (
      <div className="" style={{ position: 'relative', textAlign: 'center' }}>
        <video
          preload="metadata"
          ref="vidRef"
          poster={this.state.thumbnail}
          onEnded={this.updateState.bind(this)}
          onClick={this.updateState.bind(this)}
          onError={() => this.onImageError()}
        >
          <source
            src={this.props.source}
            type="video/mp4"
            media="all and (max-width:480px)"
          />
          <source src={this.props.source} type="video/mp4" />
          Your browser does not support the <code>video</code> tag.
        </video>
        <div
          style={{
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            position: 'absolute',
          }}
          onClick={this.updateState.bind(this)}
        >
          <i
            className={'vid-play ' + this.state.wrapper}
            onClick={this.updateState.bind(this)}
          >
            <Waypoint
              onLeave={this.way.bind(this)}
              //onAboveViewport={this.fetchTimeline}
              //onBelowViewport={this.fetchTimeline}
              //threshold={0.5}
            />
          </i>
        </div>
      </div>
    );
  }
}

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: props.source,
    };
  }

  onImageError() {
    this.setState({ source: '../mediaerror.png' });
  }
  render() {
    const image = {
      maxHeight: '515px',
      /*objectFit: 'cover',
            /*min-height: 260px;*/
      height: 'auto',
      width: '100%',
      overflow: 'hidden',
    };

    return (
      <div style={image}>
        <img
          className="img-content"
          src={this.state.source}
          onError={() => this.onImageError()}
          alt=""
          width="100%"
        />
      </div>
    );
  }
}

class MusicComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: 'play',
      currentTime: 0,
    };
    this.togglePlay = this.togglePlay.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.updateScrubber = this.updateScrubber.bind(this);
  }

  way() {
    if (this.state.playStatus === 'pause') {
      const audio = document.getElementById(`${this.props.track.post_id}`);
      audio.pause();
      this.setState({ playStatus: 'play' });
    }
  }

  updateScrubber(percent) {
    const innerScrubber = document.querySelector('.Scrubber-Progress');
    if (innerScrubber) {
      innerScrubber.style['width'] = percent;
    }
  }

  updateTime(timestamp) {
    timestamp = Math.floor(timestamp);
    this.setState({ currentTime: timestamp });
  }

  togglePlay() {
    let status = this.state.playStatus;
    const audio = document.getElementById(`${this.props.track.post_id}`);
    if (status === 'play') {
      status = 'pause';
      audio.play();
      setInterval(() => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        // Calculate percent of song
        const percent = (currentTime / duration) * 100 + '%';
        this.updateScrubber(percent);
        this.updateTime(currentTime);
      }, 100);
    } else {
      status = 'play';
      audio.pause();
    }
    this.setState({ playStatus: status });
  }

  render() {
    return (
      <PlayerComponent>
        <Background
          url={
            this.props.track.cover_image
              ? nodeHost + this.props.track.cover_image
              : 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg'
          }
        />
        <Artwork
          url={
            this.props.track.cover_image
              ? nodeHost + this.props.track.cover_image
              : 'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg'
          }
        />
        <Mask />
        <TrackInformation track={this.props.track} />
        <Scrubber />
        <Controls isPlaying={this.state.playStatus} onPress={this.togglePlay} />
        <TimeStamps
          duration={this.props.track.duration}
          currentTime={this.state.currentTime}
        />
        <audio id={this.props.track.post_id}>
          <source src={nodeHost + this.props.track.media_url} />
        </audio>
        <Waypoint
          onLeave={this.way.bind(this)}
          //onAboveViewport={this.fetchTimeline}
          //onBelowViewport={this.fetchTimeline}
          //threshold={0.5}
        />
      </PlayerComponent>
    );
  }
}

MusicComponent.defaultProps = {
  track: {
    name: 'We Were Young',
    artist: 'Odesza',
    album: "Summer's Gone",
    year: 2012,
    artwork:
      'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg',
    duration: 192,
    source:
      'https://cdn.spacetelescope.org/archives/images/wallpaper2/heic1509a.jpg',
  },
};

export default class PostComponent extends React.Component {
  render() {
    return (
      <div style={{ marginBottom: 35 }}>
        <div className="row mb-2 post">
          <Header
            id={this.props.post.user_id}
            username={this.props.post.username}
            image={nodeHost + this.props.post.user_image}
            name={this.props.post.firstname + ' ' + this.props.post.lastname}
            datetime={this.props.post.date_time}
          />

          <div className="col-12 px-0 px-sm-1 px-md-2">
            {this.props.post.type === 'video' && (
              <VideoComponent source={nodeHost + this.props.post.media_url} />
            )}
            {this.props.post.type === 'image' && (
              <ImageComponent source={nodeHost + this.props.post.media_url} />
            )}
            {this.props.post.status === 'blog' && (
              <Description description={this.props.post.description} />
            )}
            {this.props.post.type === 'audio' && (
              <MusicComponent track={this.props.post} />
            )}
            {this.props.post.type !== 'video' &&
              this.props.post.type !== 'image' &&
              this.props.post.status !== 'blog' &&
              this.props.post.type !== 'audio' &&
              'Content Not Video/Image'}
          </div>
          <Footer post={this.props.post} />
        </div>
      </div>
    );
  }
}
