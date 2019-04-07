import * as types from '../../actions/maps/actionTypes';


const initialState = {
    location: {},
  };
  
 
  const backgroundTaskReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.UPDATE_LOCATION:
      return {
        ...state,
        location: action.location
      };
      default:
        return state;
    }
  };


  
  export default backgroundTaskReducer;
  