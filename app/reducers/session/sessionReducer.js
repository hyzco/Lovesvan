import * as types from '../../actions/session/actionsTypes';

const initialState = {
  restoring: false,
  loading: false,
  user: {},
  error: null,
  logged: null,
  registered: null,
  matches :[],
  lastMessages:[],
  wizardCompleted: null,
  userData:[],
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
        wizardCompleted:true,
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
        wizardCompleted:false,
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
        matches:null,
      };
    case types.MATCHES_SUCCESS:
    return {
      ...state,
      matches : action.matches,
    };
    case types.LASTMESSAGES_SUCCESS:
    return {
      ...state,
      lastMessages: action.lastMessages,
    };
    case types.WIZARD_SUCCESS:
    return{
      ...state,
      wizardCompleted: action.wizardState,
    };
    case types.USERDATA_SUCCESS:
    return{
        ...state,
        userData : action.userData,
        
    } 
    default:
      return state;
  }
};

export default sessionReducer;
