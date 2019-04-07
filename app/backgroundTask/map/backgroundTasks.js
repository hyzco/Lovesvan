import React, { Component } from 'react';
import { Location, TaskManager } from 'expo';
import * as types from '../taskTypes';

//FUNCTIONS


export async function _unRegisterAllTasksAsync(){
    await TaskManager.unregisterAllTasksAsync();
}

export async function _getFetchBackgroundLocationAsync (uid,geoInfo){
    await Location.startLocationUpdatesAsync(types.taskLocationName, {
        accuracy: Location.Accuracy.Balanced,
      });
          TaskManager.defineTask(types.taskLocationName, async ({ data, error }) => {
            if (error) {
              // Error occurred - check `error.message` for more details.
            }
            if (data) {
            const { locations } = data;
            var coords = locations[0].coords;
            fetch('http://192.168.0.10:8080/update/currentLocation', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid: uid,
                lat: coords.latitude,
                long: coords.longitude,
                city: geoInfo.city,
                countryCode: geoInfo.country,
              }),
            });

            }
          });
  }


  //DEFINE TASKS
      
    

