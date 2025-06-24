import React from 'react';
import {TrackInformationContainer, Song, Artist, Album} from './styles'

class TrackInformation extends React.Component {

    render() {
        return (
            <TrackInformationContainer>
                <Song>{this.props.track.song_name ? this.props.track.song_name : "Unknown"}</Song>
                <Artist>{this.props.track.song_artists ? this.props.track.song_artists : "Unknown artist"}</Artist>
                <Album>{this.props.track.song_album ? this.props.track.song_album : "Unknown Album"}</Album>
            </TrackInformationContainer>
        )
    }
}

export default TrackInformation;