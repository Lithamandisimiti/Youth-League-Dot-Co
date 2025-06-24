import {
  SET_PROFILE,
  SET_PROFILE_PENDING,
  SET_PROFILE_SUCCESS,
  SET_PROFILE_ERROR,
  SET_PROFILE_FAILURE,
  SET_PROFILE_FOLLOWERS,
  SET_PROFILE_FOLLOWING,
  SET_PROFILE_IMAGE,
  SET_PROFILE_BASIC_UPDATE_SUCCESS,
  SET_PROFILE_BASIC_UPDATE_FAILURE,
  SET_PROFILE_BASIC_UPDATE_PENDING,
  SET_PROFILE_BASIC_UPDATE_ERROR,
  SET_PROFILE_WORK_UPDATE_PENDING,
  SET_PROFILE_WORK_UPDATE_SUCCESS,
  SET_PROFILE_WORK_UPDATE_FAILURE,
  SET_PROFILE_WORK_UPDATE_ERROR,
  SET_PROFILE_UPDATE_PENDING,
} from '../../actions/profile/profile';

export function profile(
  state = {
    profile: null,
    followers: '',
    following: '',
    isProfileSuccess: false,
    isProfilePending: false,
    profileError: null,
    profileFailure: null,
    isProfileBasicUpdateSuccess: false,
    isProfileBasicUpdatePending: false,
    isProfileBasicUpdateFailure: false,
    profileBasicUpdateError: null,
    isProfileWorkUpdateSuccess: false,
    isProfileWorkUpdatePending: false,
    isProfileWorkUpdateFailure: false,
    profileWorkUpdateError: null,
    isProfileUpdatePending: false,
  },
  action,
) {
  switch (action.type) {
    case SET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });
    case SET_PROFILE_FOLLOWERS:
      return Object.assign({}, state, {
        followers: action.followers,
      });
    case SET_PROFILE_FOLLOWING:
      return Object.assign({}, state, {
        following: action.following,
      });

    case SET_PROFILE_PENDING:
      return Object.assign({}, state, {
        isProfilePending: action.isProfilePending,
      });

    case SET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        isProfileSuccess: action.isProfileSuccess,
      });

    case SET_PROFILE_ERROR:
      return Object.assign({}, state, {
        profileError: action.profileError,
      });

    case SET_PROFILE_FAILURE:
      return Object.assign({}, state, {
        profileFailure: action.profileFailure,
      });

    case SET_PROFILE_IMAGE: {
      const profile = state.profile;
      if (profile != null) {
        profile[0].image = action.image;
        return Object.assign({}, state, {
          profile,
        });
      }
    }

    case SET_PROFILE_BASIC_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        isProfileBasicUpdateSuccess: action.isProfileBasicUpdateSuccess,
      });
    }

    case SET_PROFILE_BASIC_UPDATE_FAILURE: {
      return Object.assign({}, state, {
        isProfileBasicUpdateFailure: action.isProfileBasicUpdateFailure,
      });
    }

    case SET_PROFILE_BASIC_UPDATE_PENDING: {
      return Object.assign({}, state, {
        isProfileBasicUpdatePending: action.isProfileBasicUpdatePending,
      });
    }

    case SET_PROFILE_BASIC_UPDATE_ERROR: {
      return Object.assign({}, state, {
        profileBasicUpdateError: action.profileBasicUpdateError,
      });
    }

    case SET_PROFILE_WORK_UPDATE_PENDING: {
      return Object.assign({}, state, {
        isProfileWorkUpdatePending: action.isProfileWorkUpdatePending,
      });
    }

    case SET_PROFILE_WORK_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        isProfileWorkUpdateSuccess: action.isProfileWorkUpdateSuccess,
      });
    }

    case SET_PROFILE_WORK_UPDATE_FAILURE: {
      return Object.assign({}, state, {
        isProfileWorkUpdateFailure: action.isProfileWorkUpdateFailure,
      });
    }

    case SET_PROFILE_WORK_UPDATE_ERROR: {
      return Object.assign({}, state, {
        profileWorkUpdateError: action.profileWorkUpdateError,
      });
    }

    case SET_PROFILE_UPDATE_PENDING: {
      return Object.assign({}, state, {
        isProfileUpdatePending: action.isProfileUpdatePending,
      });
    }
    default:
      return state;
  }
}
