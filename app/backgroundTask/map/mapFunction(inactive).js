import React, { Component } from 'react';
import { Location, TaskManager } from 'expo';

//FUNCTIONS
this.state ={
  city:null,
  country:null,
  lat:null,
  long:null,
};


export function getLoc(uid){

    let data ={
      method: 'POST',
      body: JSON.stringify({
        uid: uid,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
  }
  return fetch('http://ffa1.lovesvan.com/get/currentLocation',data)
  .then(response => response.json()) //promise
  .then((json) =>{
  if(json.newLocation !== null){     
     this.state.lat = json.newLocation.latitude;
     this.state.long = json.newLocation.longitude;
  }
  },function(){
  }).catch((error) =>{
      console.log(error);
  });
}

export function getCurrentLat(uid){
  getLoc(uid);
  return this.state.lat;
}

 function _getGeoInfo(){
  return fetch('https://ipapi.co/json')
          .then((response) => response.json())
          .then((responseJson) => {
              return responseJson;
          }).catch((error) => {
              console.error(error);
          });
}

export function _setCurrentLocationToAPI (uid,coords){    
    
  if(this.state.city ==null || this.state.country == null){
    var geoInfo = new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(_getGeoInfo());
        },300);
    });
    
    geoInfo.then(function(value){   
          this.state.city=value.city;
          this.state.country=value.country;
    });
  }

  setTimeout(() => {
        fetch('http://ffa1.lovesvan.com/update/currentLocation', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: uid,
            lat: coords.latitude,
            long: coords.longitude,
            city: this.state.city,
            countryCode: this.state.country,
          }),
        });
  }, 500);
        

  }


  //DEFINE TASKS
      
    

