import React, { Component } from 'react';
import { Location, Permissions,BackgroundFetch, TaskManager } from 'expo';
import firebase from '@firebase/app';


state ={
  markers :[],
  location:{},
}

const taskLocationName = 'background-fetch-location';
const taskMarkName = 'background-fetch-mark';


_getLocationAsync = async ()=>{
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
  
    if (status !== 'granted') {
      this.errorMessage = 'Permission to access location was denied';
    }
 
    let location =  await Location.getCurrentPositionAsync({enableHighAccuracy:true})
    .then((location)=>{
      this.location = ( JSON.stringify(location), location);
    })
   
    if(this.location){
      this.setState({
          location:this.location
      });
    }
  }

    _getMarksAsync = async ()=>{
        var arrMarker = [];
        var ref2 = firebase.database().ref("Location/");
        ref2.once("value").then(snapshot => {
    
    snapshot.forEach(function(snapshot1) {
            arrMarker.push({
            m_uid:snapshot1.key,
            m_longitude:snapshot1.val().longitude,
            m_latitude:snapshot1.val().latitude
        });
    })
    this.setState({markers:arrMarker});
    })
    }


  
    TaskManager.defineTask(taskLocationName, () => {
        try {
          const receivedNewData = this._getLocationAsync();
          return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
        } catch (error) {
          return BackgroundFetch.Result.Failed;
        }
      });

    TaskManager.defineTask(taskMarkName, () => {
        try {
          const receivedNewData = this._getMarksAsync();
          return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
        } catch (error) {
          return BackgroundFetch.Result.Failed;
        }
      });


export const registerTaskAsync = async () => {
    await BackgroundFetch.registerTaskAsync(taskLocationName);
    await BackgroundFetch.registerTaskAsync(taskMarkName)
    console.log('task registered');
  };

export const backgroundFetcherState = {markers,location} = this.state;


