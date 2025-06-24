import React from "react";
import "./Notifications.css"
import NotificationLine from "./NotificationLine"
import NotificationList from "./NotificationList"
import { connect } from 'react-redux';

class NotificationComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            viewAll:false
        }
    }
    render(){
        return(
            <div className="col-12 col-sm-8 col-sm-offset-4 col-lg-6 col-lg-offset-6 notifications-holder">
                Notifications
                <NotificationList/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationComponent);