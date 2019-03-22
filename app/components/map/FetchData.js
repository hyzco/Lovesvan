import React, { Component } from 'react';
import { View, Button,Text,Platform,Image,FlatList,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Constants, MapView } from "expo";
import firebase from '@firebase/app';


export default class Fetchdata extends Component {
  constructor (props) {
    super(props);
  };
state ={
  stores:{},
}



componentDidMount(){
    var arrMarker = [];
    var ref2 = firebase.database().ref("Location/");
    ref2.once("value").then(snapshot => {
	 
  snapshot.forEach(function(snapshot1) {
        arrMarker.push({
        uid:snapshot1.key,
        longitude:snapshot1.val().longitude,
        latitude:snapshot1.val().latitude
      });
  })
  this.renderMarkerLocation(arrMarker);
  console.log(arrMarker);
})
}



renderMarkerLocation(arrMarker){
  this.setState({stores: arrMarker})

  console.log("1",this.state.stores[0].longitude);
}


 
   render() {
     
      return (
        <View>
       
                </View>  
      );
   }
  }