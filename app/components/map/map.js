import React, { Component } from 'react';
import { View, Button,Text,Platform,Image,FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles,mapStyle } from './style';
import { Actions } from 'react-native-router-flux';
import { Constants, MapView } from "expo";
import firebaseService from '@firebase/app';
import FetchMarker from './FetchData';


class Map extends React.Component {
    state = {
      region : null,
      errorMessage : null,
           latitude: 37.78825,
            longitude: -122.4324, 
      uid: null,
      };


      componentDidMount(){
    var user = firebaseService.auth().currentUser;
        firebaseService.database().ref('/Location/' + user.uid).on('value', (snapshot) => {
          const userObj = snapshot.val();
          this.updateLocationChange(userObj.latitude,userObj.longitude);
        });
      }

      updateLocationChange = (_lat,_long) => {
        this.setState({
          latitude:_lat,//+0.00100,
          longitude:_long,//+0.0010,
        });
       }

     

      render() {
        const {
          user: { displayName,email,photoURL,uid },
          longitude,
          latitude,
        } = this.props;

   
        return (
        <View style={styles.container}>
        
          <MapView
        
        style={styles.map}
            region={{
              latitude : this.state.latitude,
              longitude: this.state.longitude,
              longitudeDelta:0.0421,
              latitudeDelta:0.092,
            }}>
             <MapView.Marker
                coordinate={{
                  latitude : this.state.latitude,
                  longitude: this.state.longitude,
                }}
                title={displayName}
                description={email}/>  
      
      {/* fetch datadan veya redux üzerinden mark locationları al*/}  
           </MapView>
         
         
         
    {/*  <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.latitude}</Text>}
          keyExtractor={({id}, index) => id}

        />
    */}

          </View>


        );
      }
}
const mapStateToProps = ({ routes,sessionReducer,mapsReducer:{location,error} }) => ({
  routes: routes,
  user: sessionReducer.user,
  longitude:location.coords.longitude,
  latitude : location.coords.latitude,
  error : error
});

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);


