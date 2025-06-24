import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import { category } from './category/category';
import { search } from './search/search';
import { discover } from './discover/discover';
import { posts, likePost, unlikePost } from './post/post';
import { following, followers, follow } from './follow/follow';
import { events } from './event/event';
import { gallery } from './gallery/gallery';
import { authenticate, logout } from './authenticate/authenticate';
import { login } from './login/login';
import { register, validateEmail, validateUsername } from './register/register';
import { comments } from './comment/comment';
import { changePassword as authChangePassword } from './changePassword/changePassword';
import { sendEmail, resetEmailReducer } from './forgotPassword/sendEmail';
import { changePassword as noAuthChangePassword } from './forgotPassword/changePassword';
import {
  profile,
  profileBasicUpdate,
  profileWorkUpdate,
  updateUserData,
} from './profile/profile';
import {
  toggleDropdown,
  closeDropdown,
  initNotifications,
  mobileViewNotification,
} from './notification/notification';
import {
  createPost,
  createBlogPost,
  openPostingModal,
  BlogPosted,
  uploadProfilePicture,
  openProfileModal,
  openNavPostingModal,
} from './upload/upload';
import { block, unBlock, getUsers } from './block/block';
import { report, clearState } from './report/report';

export {
  createPost,
  createBlogPost,
  openPostingModal,
  BlogPosted,
  uploadProfilePicture,
  openProfileModal,
  openNavPostingModal,
  toggleDropdown as toggleNavigationDropdown,
  closeDropdown as closeNavigationDropdown,
  initNotifications,
  mobileViewNotification,
  register,
  validateEmail,
  validateUsername,
  profile,
  profileBasicUpdate,
  profileWorkUpdate,
  updateUserData as updateUserDataAction,
  posts,
  likePost,
  unlikePost,
  following,
  followers,
  follow,
  authenticate,
  logout,
  sendEmail as sendEmailAction,
  resetEmailReducer as resetEmailReducerAction,
  noAuthChangePassword as noAuthChangePasswordAction,
  authChangePassword as authChangePasswordAction,
  comments,
  login,
  gallery,
  events,
  discover,
  search,
  category,
  queryString,
  fetch,
  block as blockAction,
  unBlock as unBlockAction,
  getUsers as getUsersAction,
  report as reportAction,
  clearState as clearStateReport,
};

export const api = 'http://localhost/yl-php-backend/';
export const nodeHost = 'http://localhost:2048';
