import React from 'react'
import {ScrubberContainer, ScrubberProgress} from './styles'

class Scrubber extends React.Component{
    render(){
        return(
            <ScrubberContainer>
                    <ScrubberProgress className="Scrubber-Progress"/>
            </ScrubberContainer>
        )
    }
}

export default Scrubber;