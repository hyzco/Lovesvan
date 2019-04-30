import React, { Component } from 'react';
import { View, Button,Text,Platform,Image,FlatList,Dimensions, } from 'react-native';
import { connect } from 'react-redux';
import { styles,mapStyle } from './style';
import { Actions } from 'react-native-router-flux';

import MapView, {ProviderPropType,AnimatedRegion, Marker } from 'react-native-maps';

import { Components,Constants,Location,TaskManager, PROVIDER_GOOGLE } from "expo";
import firebaseService from '@firebase/app';


const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Map extends React.Component {

      constructor(props){
        super(props);
        this. state = {
          errorMessage : null,
          latitude: LATITUDE,
          longitude: LONGITUDE,
                
                coordinate: new AnimatedRegion({
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                }),
            };
      }

      componentDidMount(){
        this.updateLocationChange();
      }

      updateMarkLocationChange(uid){
        setTimeout(() => {
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
                this.animate(json.newLocation);
            }
            },function(){
            }).catch((error) =>{
                console.log(error);
            });
        },300);
      }

     isUpdate = false;
      updateLocationChange(){
        var user = firebaseService.auth().currentUser;
        firebaseService.database().ref('/Location/'+user.uid).on('value', (snapshot) => {
          const userObj = snapshot.val();
          
          this.state.coordinate.setValue(userObj);

          if(this.isUpdate==false){
              console.log(this.isUpdate);
          this.setState({
            latitude:userObj.latitude,
            longitude:userObj.longitude,
          });
          this.isUpdate = true;
          console.log(this.isUpdate);
        }
        this.updateMarkLocationChange(this.props.user.uid);
        },function(error){
          console.log(error);
        });
       }

       animate(region) {
        const { coordinate } = this.state;
        const newCoordinate = {
          latitude: region.latitude,
          longitude: region.longitude,
        };
    
        coordinate.timing(newCoordinate).start();
      }

      render() {
        const {
          user: { displayName,email,photoURL,uid },
          markLocation
        } = this.props;
        

        return (
      <View style={styles.container}>
        <MapView
          provider = {PROVIDER_GOOGLE}
          style={styles.map}
          customMapStyle={mapStyle}
          region={{
                latitude : this.state.latitude,
                longitude: this.state.longitude,
                longitudeDelta:LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA,
            }}>
            
            <Marker.Animated
            ref={marker => { this.marker = marker; }}
            coordinate={this.state.coordinate}
            title={this.props.user.uid}
            description={this.props.user.email}
            pinColor ={'#ff00c2'}

          />

                    
                  {
                    this.props.markLocation.map((mark,i) => {
                      if(mark.m_uid !== this.props.user.uid){
                      return(         
                      <MapView.Marker
                        coordinate={{
                          latitude : mark.m_latitude,
                          longitude: mark.m_longitude,
                        }}
                              key = {mark.m_uid}
                              title={mark.m_uid}
                              description={mark.m_uid+" "}
                              pinColor={'#7704A7'}/>
                          );
                        }
                    })   
                  }

           </MapView>         
          </View>
        );
      }
}
            
            const mapStateToProps = ({ routes,sessionReducer,mapsReducer:{error,markSuccess}}) => ({
              routes: routes,
              user: sessionReducer.user,
              error : error,
              markLocation:markSuccess,
            });

            const mapDispatchToProps = {

            };

            export default connect(
              mapStateToProps,
              mapDispatchToProps
            )(Map);

