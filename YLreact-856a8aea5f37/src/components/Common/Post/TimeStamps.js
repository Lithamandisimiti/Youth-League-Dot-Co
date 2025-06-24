import React from 'react';
import { TimeStampsContainer, Time } from './styles';

class Timestamps extends React.Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);
  }

  convertTime(timestamp) {
    let minutes = Math.floor(timestamp / 60);
    let seconds = timestamp - minutes * 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    timestamp = minutes + ':' + seconds;
    return timestamp;
  }

  render() {
    return (
      <TimeStampsContainer>
        <Time>{this.convertTime(this.props.currentTime)}</Time>
      </TimeStampsContainer>
    );
  }
}

export default Timestamps;
