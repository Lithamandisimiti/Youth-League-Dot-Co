import styled from 'styled-components';

export const PlayerComponent = styled.div`
    background: #A9A9A9;
    opacity: 0.9;
    overflow: hidden;
    box-shadow: 0 5px 10px -5px rgba(#121212, 1);
    height: 440px;
    position: relative;
    width: 100%;
    padding-top:50px;
`
export const Background = styled.div`
    width: 150%;
    height: 150%;
    position: absolute;
    top: -25%;
    left: -25%;
    background: url(${props => props.url});
    background-size: cover;
    background-position: center center;
    opacity: .2;
    filter: blur(10px);
`

export const Title = styled.div`
    width: 300px;
    margin: 50px auto;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: .1em;
    position: relative;
`

export const Artwork = styled.div`
    width: 250px;
    height: 250px;
    background: url(${props => props.url});
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    margin: auto;
    box-shadow: 0 5px 10px -5px rgba(#121212, .25);
    position: relative;
`

export const TrackInformationContainer = styled.div`
    width: 300px;
    margin: 30px auto;
    text-align: center;
    position: relative;
`

export const Song = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 300;
`

export const Artist = styled.div`
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 500;
`

export const Album = styled.div`
    font-size: 12px;
    opacity: .5;
`

export const ScrubberContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 7px;
    opacity: .5;
    transition: opacity .25s ease;

    &:active {
        opacity: 1;
    }
`

export const ScrubberProgress = styled.div`
    background-color:grey;
    height: 100%;
    width: 0;
    transition: width .25s ease;
`

export const ControlsContainer = styled.div`
    position: absolute;
    top: 31%;
    pointer-events: none;
    margin: auto;
    left: 0;
    right: 0;
`

export const Button = styled.div`
    height: 75px;
    width: 75px;
    border: 2px solid #FFFFFF;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 75px;
    box-shadow: 0 5px 10px 0px rgba(#121212, .125);
    margin: auto;
    pointer-events: all;

    &:active {
        transform: scale(.98);
        background: #fff;
    }
`

export const  TimeStampsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    bottom: 45%;
    top: 0;
    pointer-events: none;
    z-index: 2;
    width: 100%;
`

export const Time = styled.div`
    font-size: 12px;
`

export const Mask = styled.div`
    width: 250px;
    height: 250px;
    background-color: #000000;
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    margin: auto;
    box-shadow: 0 5px 10px -5px rgba(#121212, .25);
    position: absolute;
    top:11.3%;
    left: 0;
    right: 0;
    opacity:0.2;
`