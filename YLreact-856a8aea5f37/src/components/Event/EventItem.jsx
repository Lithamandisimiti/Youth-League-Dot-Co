import React from 'react';
import EventButton from './EventButton';
import PropTypes from 'prop-types';

import { api, fetch, queryString } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import { _isMobile } from '../Common/Validate/validate';
import './Events.css';

class Event extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    event_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    date: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    goingActive: PropTypes.bool.isRequired,
    interestedActive: PropTypes.bool.isRequired,
  };
  static defaultProps = {
    title: 'Event',
    goingActive: false,
    interestedActive: false,
  };
  constructor(props) {
    super(props);
    const eventPosterUrl = this.props.poster;

    this.state = {
      isMobile: _isMobile(),
      eventPosterUrl: eventPosterUrl,
      goingLoading: false,
      interestedLoading: false,
      goingActive: this.props.goingActive,
      interestedActive: this.props.interestedActive,
      detailStyle: !_isMobile()
        ? {}
        : {
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.7) 100%),url("${eventPosterUrl}")`,
            minHeight: '200px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: 'black',
            cursor: 'pointer',
          },
    };
    this.mobileDoubleTap = this.mobileDoubleTap.bind(this);
  }
  /*componentWillReceiveProps(nextProps){
        var eventPosterUrl=this.props.poster;
        this.setState({
            isMobile:_isMobile(),
            detailStyle:!_isMobile()?{}:{
                "backgroundImage":`linear-gradient(to bottom, rgba(255,255,255,0.4) 0%,rgba(255,255,255,0.7) 100%),url("${eventPosterUrl}")`,
                "minHeight":"200px",
                backgroundRepeat:"no-repeat",
                backgroundSize:"cover",
                color:"black",
                cursor:"pointer"
            }
        })
    }*/
  mobileDoubleTap(e) {
    if (this.state.isMobile) {
      this.onGoing();
    }
  }
  onGoing() {
    if (!this.state.goingLoading && !this.state.interestedLoading) {
      const active = this.state.goingActive;
      this.setState({ goingLoading: true, goingActive: false });
      const data = {
        id: this.props.id,
        event_id: this.props.event_id,
        status: 'going',
      };
      const apiString = active ? 'unattend-event.php' : 'attend-event.php';

      fetch(`${api}api/${apiString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          if (!active)
            this.setState({
              goingLoading: false,
              goingActive: true,
              interestedActive: false,
            });
          else if (active)
            this.setState({
              goingLoading: false,
              goingActive: false,
              interestedActive: false,
            });
        })
        .catch(error => console.error('event error:', error));
    }
  }
  onInterested() {
    if (!this.state.goingLoading && !this.state.interestedLoading) {
      const active = this.state.interestedActive;
      this.setState({ interestedLoading: true, interestedActive: false });
      const data = {
        id: this.props.id,
        event_id: this.props.event_id,
        status: 'intersted',
      };
      const apiString = active ? 'unattend-event.php' : 'attend-event.php';

      fetch(`${api}api/${apiString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          if (!active)
            this.setState({
              interestedLoading: false,
              goingActive: false,
              interestedActive: true,
            });
          else if (active)
            this.setState({
              interestedLoading: false,
              goingActive: false,
              interestedActive: false,
            });
        })
        .catch(error => console.error('event error:', error));
    }
  }
  render() {
    const state = this.state;
    const props = this.props;

    return (
      <div onDoubleClick={this.mobileDoubleTap} className="event-block">
        {!state.isMobile && (
          <div className="col-md-6 col-xs-12 event-poster-holder">
            <img
              alt="Event poster"
              className="event-poster"
              src={state.eventPosterUrl}
            />
          </div>
        )}
        <div
          style={state.detailStyle}
          className="col-md-6 col-xs-12 event-details-holder"
        >
          <div className="heading">{props.heading}</div>
          <div className="event-detail venue">
            <span>venue:</span> {props.venue}
          </div>
          <div className="event-detail date">
            <span>date:</span> {props.date}
          </div>
          <div className="event-detail time">
            <span>time:</span> {props.time}
          </div>
          <div className="event-buttons-holder">
            <EventButton
              onClick={() => this.onGoing()}
              loading={this.state.goingLoading}
              active={this.state.goingActive}
              title="I'm going"
            />
            <EventButton
              onClick={() => this.onInterested()}
              loading={this.state.interestedLoading}
              active={this.state.interestedActive}
              title="I'm Interested"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Event);
