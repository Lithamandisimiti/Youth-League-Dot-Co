import { api, fetch, queryString } from '../actions';

export const SET_NOTIFICATIONS_DROPDOWN_STATUS =
  'SET_NOTIFICATIONS_DROPDOWN_STATUS_reducer';
export const SET_NOTIFICATIONS_DROPDOWN_CLOSE =
  'SET_NOTIFICATIONS_DROPDOWN_CLOSE_reducer';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const SEND_NOTIFICATION = 'SEND_NOTIFICATION';
export const SET_NOTIFICATION_NUMBER = 'SET_NOTIFICATION_NUMBER';
export const SET_NOTIFICATIONS_LIST = 'SET_NOTIFICATIONS_LIST';
export const MOBILE_VIEW_NOTIFICATIONS = 'MOBILE_VIEW_NOTIFICATIONS';

function newNotification(id, notification) {
  return (dispatch, getState) => {
    dispatch({ type: NEW_NOTIFICATION, id, notification });
  };
}
function setNotification(number, unviewed) {
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTIFICATION_NUMBER, number, unviewed });
  };
}
function setInitNotifications(notifications) {
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTIFICATIONS_LIST, notifications });
  };
}

export function sendNotification(type, toId, postId, postType) {
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      const id = localStorage.getItem('userId');
      if (id != toId) {
        const socket = getState().notifications.socket;
        const user = localStorage.getItem('userName');
        const image = localStorage.getItem('userProfileImage');
        type = type.toLowerCase();
        switch (type) {
          case 'like': {
            socket.emit('like', user, id, toId, postId, postType, image);
            break;
          }
          case 'comment': {
            socket.emit('comment', user, id, toId, postId, postType, image);
            break;
          }
          case 'follow': {
            socket.on('follow', user, id, toId, image);
            break;
          }
          case 'interested': {
            socket.on('interested', user, id, toId, image);
            break;
          }
        }
        dispatch({ type: SEND_NOTIFICATION });
      }
    }
  };
}
export function mobileViewNotification() {
  return (dispatch, getState) => {
    dispatch({ type: MOBILE_VIEW_NOTIFICATIONS });
  };
}
export function toggleDropdown() {
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTIFICATIONS_DROPDOWN_STATUS });
  };
}
export function closeDropdown() {
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTIFICATIONS_DROPDOWN_CLOSE });
  };
}
export function initNotifications() {
  return (dispatch, getState) => {
    if (getState().authenticate.isLoggedIn) {
      const socket = getState().notifications.socket;
      const user_id = localStorage.getItem('userId');
      socket.emit('init', user_id);
      socket.emit('initbadgenotifications', user_id);
      socket.emit('initlinenotifications', user_id);
      socket.on('connect', function() {
        socket.emit('init', user_id);
        socket.emit('initbadgenotifications', user_id);
        socket.emit('initlinenotifications', user_id);
      });
      socket.on('initbadgenotifications', function(result) {
        //[{id:21}]
        const arr = result.map(item => {
          return item.id;
        });
        dispatch(setNotification(result.length, arr));
      });
      socket.on('initlinenotifications', function(result) {
        //[{id:21}]
        const arr = result.map(item => {
          const time = getTime(item.date_time);
          return {
            from: '',
            message: item.message,
            time,
            now: Date.now(),
            date: getDate(item.date_time),
            id: item.id,
            image: item.profile_image,
            notification_type: item.type,
          };
        });
        dispatch(setInitNotifications(arr));
      });
      socket.on('comment', function(fromName, type, href, id, profile_image) {
        const obj = {
          from: fromName,
          message: `${fromName} commented on your ${type}`,
          id,
          date: getDate(),
          time: '',
          image: profile_image,
          notification_type: 'comment',
        };
        dispatch(newNotification(id, obj));
      });
      socket.on('like', function(fromName, type, href, id, profile_image) {
        const obj = {
          from: fromName,
          message: `${fromName} liked your ${type}`,
          id,
          date: getDate(),
          time: '',
          image: profile_image,
          notification_type: 'like',
        };
        dispatch(newNotification(id, obj));
      });
      socket.on('follow', function(fromName, href, id, profile_image) {
        const obj = {
          from: fromName,
          message: `${fromName} started following you`,
          id,
          date: getDate(),
          time: '',
          image: profile_image,
          notification_type: 'follow',
        };
        dispatch(newNotification(id, obj));
      });
    }
  };
}

function getTime(date_time) {
  if (date_time) {
    let time = date_time.split('T')[1].split(':');
    time.pop();
    time = time.join(':');
    return time;
  }
  return '';
}
function getDate(date_time) {
  if (date_time) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dateArr = date_time.split('T')[0].split('-');
    return `${dateArr[2]} ${months[parseInt(dateArr[1]) - 1]}, ${dateArr[0]}`;
  }
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  return h < 10 && m < 10
    ? `Today 0${h}:0${m}`
    : h < 10
    ? `Today 0${h}:${m}`
    : m < 10
    ? `Today ${h}:0${m}`
    : `Today ${h}:${m}`;
}
