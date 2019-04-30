import * as types from '../../actions/maps/actionTypes';
import {Location, Permissions } from "expo";
import React, { Component } from 'react';
const initialState = {
    location: {},
    markSuccess:[],
    error : null,
   // Inactive can use for ip services objGeoReverse:{},
   status : null,
  };
  
 
  const mapsReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.LOCATION_SERVICE:
      return{
        ...state,
        status: action.status
      };
      case types.MARK_SUCCESS:
      return {
        ...state,
        markSuccess: action.markSuccess
      };
      case types.SUCCESS_LOCATION:
        return { 
            ...state, location: action.location
         };
     /* case types.SUCCESS_GEOREVERSE:
      return{
        ...state, objGeoReverse: action.objGeoReverse
      };*/
      case types.FAILED_LOCATION:
        return { ...state, error: action.error };
      default:
        return state;
    }
  };


  
  export default mapsReducer;
  