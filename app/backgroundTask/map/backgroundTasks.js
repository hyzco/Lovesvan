import React, { Component } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as types from '../taskTypes';
//FUNCTIONS

let uid = null;
let geoInfo = {};


/*export async function _unRegisterAllTasksAsync(taskName){
              Location.stopLocationUpdatesAsync(types.taskLocationName);
}*/

export async function _getFetchBackgroundLocationAsync (uid,geoInfo){
  var coords = null;
    await Location.startLocationUpdatesAsync(types.taskLocationName, {
        accuracy: Location.Accuracy.HIGH,
      });
      this.uid = uid;
      this.geoInfo = geoInfo;
  }

  
  TaskManager.defineTask(types.taskLocationName, async ({ data, error }) => {
    if (error) {
      // Error occurred - check `error.message` for more details.
    }
    if (data && this.uid != null) {
       const { locations } = data;
         coords = locations[0].coords;
      if(this.uid !== null){
       setTimeout(() => {
         if(Object.keys(this.geoInfo).length != 0){
        fetch('http://ffa1.lovesvan.com/update/currentLocation', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _uid: this.uid,
            _lat: coords.latitude,
            _long: coords.longitude,
            _city: this.geoInfo.city,
            _countryCode: this.geoInfo.country_name,
          }),
        });
        }else{
          fetch('http://ffa1.lovesvan.com/update/currentLocation', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              _uid: this.uid,
              _lat: coords.latitude,
              _long: coords.longitude,
            }),
          });
        }
      }, 3000);
 
   
       }
    }
});
      
     


    

