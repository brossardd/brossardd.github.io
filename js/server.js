
export const REFRESH = 'REFRESH';

function rootReducer(state = {}, action) {
  switch (action.type) {
    case REFRESH:
      return {};
    default:
      return {
        ...state,
        [action.type]: action.data
      };
  }
}
