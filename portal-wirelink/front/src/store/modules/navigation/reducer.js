import produce from 'immer';

const INITIAL_STATE = {
  route: 'home',
  state: {},
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@navigation/NAVIGATE': {
        draft.route = action.payload.route;
        draft.state = action.payload.state;
        break;
      }

      default:
    }
  });
}
