import React from 'react';
import { Route, IndexRoute } from 'react-router';

import EmailSent from './components/Entry/EmailSent.jsx';
import NonAuthComponent from './components/Auth/NonAuthComponent.jsx';
import AuthComponent from './components/Auth/AuthComponent.jsx';
import NavigationComponent from './components/Navigation/NavigationComponent.jsx';
import HomeComponent from './components/Home/HomeComponent.jsx';
import SearchComponent from './components/Search/SearchComponent.jsx';
import ExploreComponent from './components/Search/Explore/ExploreComponent.jsx';
import CategoryComponent from './components/Search/Category/CategoryComponent.jsx';
import CategoryViewComponent from './components/Search/Category/CategoryViewComponent.jsx';
import DiscoverComponent from './components/Search/Discover/DiscoverComponent.jsx';
import PeopleComponent from './components/Search/People/PeopleComponent.jsx';
import ProfileComponent from './components/Profile/ProfileComponent.jsx';
import ProfileTimelineComponent from './components/Profile/Timeline/TimelineComponent.jsx';
import GalleryComponent from './components/Profile/Gallery/GalleryComponent.jsx';
import AboutComponent from './components/Profile/About/AboutComponent.jsx';
import SettingsComponent from './components/Profile/Settings/SettingsComponent.jsx';
import GeneralComponent from './components/Profile/Settings/Pages/General.jsx';
import BlockingComponent from './components/Profile/Settings/Pages/Blocking/Blocking.jsx';
import ChangePasswordComponent from './components/Profile/Settings/Pages/ChangePassword.jsx';
import ReportComponent from './components/Profile/Settings/Pages/Report.jsx';
import FollowersComponent from './components/Profile/Followers/FollowersComponent.jsx';
import FollowingComponent from './components/Profile/Following/FollowingComponent.jsx';
import LoginComponent from './components/Entry/Login/LoginComponent.jsx';
import RegisterComponent from './components/Entry/Register/RegisterComponent.jsx';
import SendEmailComponent from './components/Entry/ForgotPassword/SendEmail.jsx';
import ForgotPassword from './components/Entry/ForgotPassword/ChangePassword.jsx';
import NotificationComponent from './components/Notification/NotificationComponent';
import EventComponent from './components/Event/EventComponent.jsx';
import TermsAndConditions from './components/Legal/TermsAndConditions.jsx';
import Cookies from './components/Legal/Cookies.jsx';

export default (
  <Route component={NavigationComponent}>
    <Route path="/auth" component={NonAuthComponent}>
      <Route path="/auth/login" component={LoginComponent} />
      <Route path="/auth/register" component={RegisterComponent} />
      <Route path="/auth/forgot-password" component={SendEmailComponent} />
      <Route path="/auth/change-password/:key" component={ForgotPassword} />
      <Route path="/auth/email-sent" component={EmailSent} />
    </Route>
    <Route path="/terms-and-conditions" component={TermsAndConditions} />
    <Route path="/cookies" component={Cookies} />
    <IndexRoute component={HomeComponent} />
    <Route path="/" component={HomeComponent} />
    <Route path="/" component={AuthComponent}>
      <Route path="/notifications" component={NotificationComponent} />
      <Route path="/search" component={SearchComponent}>
        <Route path="/explore" component={ExploreComponent} />
        <Route path="/events" component={EventComponent} />
        <Route path="/categories" component={CategoryComponent} />
        <Route path="/categories/:id/:name" component={CategoryViewComponent} />
        <Route path="/discover" component={DiscoverComponent} />
        <Route path="/search/people/:term" component={PeopleComponent} />
      </Route>
      <Route path="/:username" component={ProfileComponent}>
        <IndexRoute component={ProfileTimelineComponent} />
        <Route path="/" component={ProfileTimelineComponent} />
        <Route path="/:username/gallery" component={GalleryComponent} />
        <Route path="/:username/about" component={AboutComponent} />
        <Route path="/:username/settings" component={SettingsComponent} />
        <Route path="/:username/followers" component={FollowersComponent} />
        <Route path="/:username/following" component={FollowingComponent} />
        <Route
          path="/:username/settings/general"
          component={GeneralComponent}
        />
        <Route
          path="/:username/settings/blocking"
          component={BlockingComponent}
        />
        <Route
          path="/:username/settings/security"
          component={ChangePasswordComponent}
        />
        <Route
          path="/:username/settings/report-problem"
          component={ReportComponent}
        />
      </Route>
    </Route>
  </Route>
);
