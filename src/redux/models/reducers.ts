export const reducerActions = {
  setState(state: Object, payload: Object): Object {
    return {
      ...state,
      ...payload,
      isServerError: false,
    };
  },
  setError(state: Object, payload: boolean) {
    return {
      ...state,
      isServerError: payload,
    };
  },
  clear(state: Object, payload = {}) {
    return {
      ...state,
      ...payload,
    };
  },
};
