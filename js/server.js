// ACTIONS
export const REFRESH = 'REFRESH';

export function refresh() {
  return {
    type: REFRESH
  };
}

// Reducer
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

// Middleware

// TODO
const bus = new ServerWebSocketEventBus();

/**
 * Broadcast the state.
 * @param store The Redux store
 * @param store The Redux store
 * @returns The result of the next action
 */
const broadcastState = store => next => action {
  const result = next(action);
  const state = store.getState();
  bus.sendMessage({type: 'UPDATE_STATE', data: state});
  return result;
};

/**
 * The redux state store, built with the Epic middleware.
 */
const store = createStore(
  rootReducer,
  applyMiddleware(broadcastState)
);
