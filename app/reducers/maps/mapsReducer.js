import * as types from '../../actions/maps/actionTypes';
import {Location, Permissions } from "expo";

const initialState = {
    location: {},
    error : null,
  };
  

  const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SUCCESS_LOCATION:
        return { 
            ...state, location: action.location
         };
      case types.FAILED_LOCATION:
        return { ...state, error: action.error };
      default:
        return state;
    }
  };


  
  export default mapsReducer;
  