import * as types from '../../actions/session/actionsTypes';

const initialState = {
  restoring: false,
  loading: false,
  user: {},
  error: null,
  logged: null,
  registered: null,
  matches :[],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SESSION_RESTORING:
      return { ...state, restoring: true };
    case types.SESSION_LOADING:
      return { ...state, restoring: false, loading: true, error: null };
    case types.SESSION_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: true,
        registered: null,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: null,
        registered: true,
      //  matches : action.matches,
      };
    case types.SESSION_ERROR:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: null,
        error: action.error,
        logged: null,
        registered: null
      };
    case types.SESSION_LOGOUT:
      return {
        ...state,
        restoring: false,
        loading: false,
        error: action.error,
        logged: false,
        registered: null,
      };
    case types.MATCHES_SUCCESS:
    return {
      ...state,
      matches : action.matches,
    }
    default:
      return state;
  }
};

export default sessionReducer;
