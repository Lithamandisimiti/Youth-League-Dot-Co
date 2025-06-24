import React from 'react';
import { ControlsContainer, Button } from './styles'

class Controls extends React.Component {
    render() {
        let classNames;
		if (this.props.isPlaying === 'pause') {
			classNames = 'icon ion-ios-pause';
		} else {
			classNames = 'icon ion-ios-play';
		}
        return (
            <ControlsContainer>
                <Button onClick={this.props.onPress}>
                    <i className={classNames} style={{color:'#FFFFFF', fontSize:30}}></i>
                </Button>
            </ControlsContainer>
        )
    }
}

export default Controls;