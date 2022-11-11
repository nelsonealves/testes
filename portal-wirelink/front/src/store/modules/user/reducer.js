import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  company: '',
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = action.payload.user;
        draft.company = action.payload.company;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@user/UPDATE_COMPANY': {
        draft.company = action.payload.company;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.company = '';
        break;
      }
      default:
    }
  });
}
