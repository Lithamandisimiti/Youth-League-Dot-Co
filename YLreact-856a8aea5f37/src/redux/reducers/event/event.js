import { 
    SET_EVENTS,
    SET_EVENTS_LOADED
}  from '../../actions/event/event';

export function events(state={
        events:[],
        isLoadedEvents:false
    },action){
        switch (action.type) {
            case SET_EVENTS:{
                if(action.events==null)   
                    return Object.assign({}, state, {events: []});
                else
                    return Object.assign({}, state, {events: action.events});
            }
            case SET_EVENTS_LOADED:{
                    return Object.assign({}, state, {isLoadedEvents: action.isLoadedEvents});
            }
            default:
                return state;
        }
}