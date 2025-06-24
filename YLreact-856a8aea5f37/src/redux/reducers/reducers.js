import { combineReducers } from 'redux';

//reducers
import { category } from './category/category';
import { search } from './search/search';
import { posts } from './post/post';
import { events } from './event/event';
import { following, followers } from './follow/follow';
import { gallery } from './gallery/gallery';
import { profile } from './profile/profile';
import { authenticate } from './authenticate/authenticate';
import { login } from './login/login';
import { register, validateEmail, validateUsername } from './register/register';
import { notifications } from './notifications/notifications';
import { comments } from './comment/comment';
import { uploads } from './upload/upload';
import { discover } from './discover/discover';
import { changePassword } from './changePassword/changePassword';
import { sendEmail as sendEmailReducer } from './forgotPassword/sendEmail';
import { changePassword as forgotPasswordReducer } from './forgotPassword/changePassword';
import {
  block as blockReducer,
  unBlock as unBlockReducer,
  getUsers as getUsersReducer,
} from './block/block';
import { report as reportReducer } from './report/report';

const YLApp = combineReducers({
  authenticate,
  category,
  changePassword,
  discover,
  search,
  posts,
  events,
  following,
  followers,
  gallery,
  profile,
  login,
  register,
  notifications,
  comments,
  uploads,
  validateEmail,
  validateUsername,
  sendEmailReducer,
  forgotPasswordReducer,
  blockReducer,
  unBlockReducer,
  getUsersReducer,
  reportReducer,
});

export default YLApp;
