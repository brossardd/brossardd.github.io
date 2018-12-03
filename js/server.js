
export const REFRESH = 'REFRESH';

export function refresh() {
  return {
    type: REFRESH
  };
}

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
