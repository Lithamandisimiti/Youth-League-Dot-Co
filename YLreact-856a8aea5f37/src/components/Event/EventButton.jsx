import React from "react"
import PropTypes from 'prop-types';
import Spinner from "../Common/Spinner/Spinner"

const styles={
    container:{
        border:"1px solid black",
        width:"150px",
        height:"40px",
        display:"flex",
        "justifyItems":"center",
        "justifyContent":"center",
        "alignItems":"center",
        textTransform:"uppercase",
        fontWeight:"400",
        fontSize:"11px",
        color:"black",
        cursor:"pointer"
    },
    containerSelected:{
        border:"1px solid black",
        background:"black",
        width:"150px",
        height:"40px",
        display:"flex",
        "justifyItems":"center",
        "justifyContent":"center",
        "alignItems":"center",
        textTransform:"uppercase",
        fontWeight:"400",
        fontSize:"11px",
        color:"white",
        cursor:"pointer"
    },
    spinnerHolder:{
        alignSelf:"center"
    }
}

export default class EventButton extends React.Component {    
    static propTypes = {
        onClick: PropTypes.func.isRequired,
        loading: PropTypes.bool,
        active: PropTypes.bool,
        title: PropTypes.string
    };
    static defaultProps = {
        loading:false,
        active:false,
        title:"Click"
    };
    compo
    render(){
        var container=this.props.active?styles.containerSelected:styles.container
        return (
            <div onClick={this.props.onClick} style={container}>
                {
                    this.props.loading &&
                    <div style={styles.spinnerHolder}>
                        <Spinner/>
                    </div>
                }
                {
                    !this.props.loading &&
                    <div>{this.props.title}</div>
                }
            </div>
        )
    }
}
