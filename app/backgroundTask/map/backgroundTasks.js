import React, { Component } from 'react';
import { Location, TaskManager } from 'expo';
import * as types from '../taskTypes';
import {LocationDialog} from '../../components/map/function'
//FUNCTIONS

let uid = null;
let geoInfo = {};


/*export async function _unRegisterAllTasksAsync(taskName){
              Location.stopLocationUpdatesAsync(types.taskLocationName);
}*/

export async function _getFetchBackgroundLocationAsync (uid,geoInfo){
  var coords = null;
    await Location.startLocationUpdatesAsync(types.taskLocationName, {
        accuracy: Location.Accuracy.BestForNavigation,
      });
      this.uid = uid;
      this.geoInfo = geoInfo;
  }

  
  TaskManager.defineTask(types.taskLocationName, async ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
    }
    if (data && this.uid != null && this.geoInfo != {}) {

    const { locations } = data;
     coords = locations[0].coords;
    if(this.uid !== null){
      setTimeout(() => {
        fetch('http://ffa1.lovesvan.com/update/currentLocation', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: this.uid,
            lat: coords.latitude,
            long: coords.longitude,
            city: this.geoInfo.city,
            countryCode: this.geoInfo.country,
          }),
        });
      }, 3000);
  
       }
    }
});
      
     


    

