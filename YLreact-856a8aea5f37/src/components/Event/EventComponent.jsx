import React from 'react';
// import { Link, IndexLink, browserHistory  } from 'react-router';

import { connect } from 'react-redux';
import Event from "./EventItem"
import {_isMobile} from "../Common/Validate/validate"
import {events} from "../../redux/actions/actions"
import Spinner from "../Common/Spinner/Spinner";
import "./Events.css";

class EventComponent extends React.Component{
    constructor(props){
        super(props)
        let id = (this.props.isLoggedIn) ? localStorage.getItem("userId") : -1;
        let from=0;
        let amount=10;
        this.state={
            user_id:id,
            mobile:_isMobile()?{}:{width:"80%"},
            pageFrom:from,
            pageAmount:amount
        }
        if(id!=-1)
            this.props.events(id,from,amount);
    }
    componentDidMount() {
    }
    onPageNation(){     
        let user_id =this.state.user_id;
        if(user_id!=-1){
            let pageFrom=this.state.pageFrom;
            let pageAmount=this.state.pageAmount 
            this.props.events(user_id,pageFrom,pageAmount);
            this.setState({pageFrom:pageFrom+=pageAmount,pageAmount:pageAmount+=10})
        }
    }
    render(){
        return(
            <div style={this.state.mobile} className="events-container">
                {
                    this.props.eventsList.map((event,index)=>{
                        let going=false
                        let status=event.status||false
                        if(status){
                            going=event.status=="going"?true:false
                        }
                      return  <Event id={this.state.user_id} goingActive={status && going} interestedActive={status && !going} event_id={parseInt(event.event_id)} key={index} heading={event.name} time={event.date_time.split(" ")[1]} date={event.date_time.split(" ")[0]} venue={event.venue} poster={event.image}/>
                    })
                }
                {
                    !this.props.isLoadedEvents &&
                    <Spinner/>
                }
                {
                    this.props.isLoadedEvents &&
                    this.props.eventsList.length==0 && <div style={{fontSize:"1rem",textAlign:"center",padding:"15px"}}>No upcoming events.</div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authenticate.isLoggedIn,
        eventsList:state.events.events,
        isLoadedEvents:state.events.isLoadedEvents
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        events: (id,from,limit) => dispatch(events(id,from,limit))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventComponent);