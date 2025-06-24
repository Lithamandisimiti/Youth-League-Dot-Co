import React from "react";

export default class NotificationLine extends React.Component{

    constructor(props){
        super(props);
        this.state={
            image: this.props.image,
        }
    }

    onImageError() {
        this.setState({image: `${process.env.PUBLIC_URL}/images/user.png`});
    }

    render(){
        return(
            <div className="notification-line">
                <img className="notification-profile" src={this.state.image} alt={() => this.onImageError()} onError={() => this.onImageError()}/>
                <div className="notification-details-holder">
                    <div className="notification-details-message">
                        {this.props.message}
                    </div>
                    <div className="notification-details-times-holder">
                        <div className="notification-details-date">{this.props.date}</div>
                        <div className="notification-details-time">{this.props.time}</div>
                    </div>
                </div>
            </div>
        )
    }
}
/*const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

//export default connect(mapStateToProps, mapDispatchToProps)(NotificationLine);*/