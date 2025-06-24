import { 
    NEW_NOTIFICATION,
    SET_NOTIFICATIONS_DROPDOWN_STATUS,
    SET_NOTIFICATIONS_DROPDOWN_CLOSE,
    SET_NOTIFICATION_NUMBER,
    SET_NOTIFICATIONS_LIST,
    MOBILE_VIEW_NOTIFICATIONS
} from '../../actions/notification/notification';
import io from 'socket.io-client'; 
import { nodeHost as notificationsHost } from '../../actions/actions';
const socket=io.connect(notificationsHost);
export function notifications(state={
        dropdownOpen:false,
        socket,
        unviewed:[],
        notifications:0,
        notificationList:[]
    },action){
        switch (action.type) {
            case SET_NOTIFICATIONS_DROPDOWN_STATUS:{
                let unviewed=state.unviewed
                if(!state.dropdownOpen && state.unviewed.length>0){
                    state.unviewed.map((id)=>{
                        state.socket.emit("viewnotification",id)
                    })
                    unviewed=[]
                }
                return Object.assign({}, state, {dropdownOpen: !state.dropdownOpen,notifications:0,unviewed});
            }
            case MOBILE_VIEW_NOTIFICATIONS:{
                let unviewed=state.unviewed
                if(state.unviewed.length>0){
                    state.unviewed.map((id)=>{
                        state.socket.emit("viewnotification",id)
                    })
                    unviewed=[]
                }
                return Object.assign({}, state, {notifications:0,unviewed});
            }
            case SET_NOTIFICATIONS_DROPDOWN_CLOSE:{
                return Object.assign({}, state, {dropdownOpen: false,notifications:0});
            }
            case NEW_NOTIFICATION:{
                let uns=state.unviewed
                let nl=state.notificationList
                uns.push(action.id)
                nl.reverse().push(action.notification)
                nl.length>7?nl.reverse().pop():nl.reverse()
                
                return Object.assign({}, state, {notifications: state.notifications+1,unviewed:uns,notificationList:nl});
            }
            case SET_NOTIFICATIONS_LIST:{                        
                return Object.assign({}, state, {notificationList:action.notifications});
            }
            case SET_NOTIFICATION_NUMBER:{
                return Object.assign({}, state, {notifications: action.number,unviewed:action.unviewed});
            }
            default:
                return state;
        }
}