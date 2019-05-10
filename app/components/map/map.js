import React, { Component } from 'react';
import { View, Button,Text,Platform,Image,FlatList,Dimensions,Animated,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { styles,mapStyle } from './style';
import { Actions } from 'react-native-router-flux';
import { logoutUser } from '../../actions/session/actions';

import MapView, {ProviderPropType,AnimatedRegion, Marker } from 'react-native-maps';
import theme from './screen/theme'
import { Components,Constants,Location,TaskManager, PROVIDER_GOOGLE } from "expo";
import firebaseService from '@firebase/app';
import {LocationDialog} from '../map/screen/LocationModal';
import DownSlidingPanel from './screen/DownSlidingPanel';
import {Block} from 'galio-framework';
import Icons from 'react-native-vector-icons/FontAwesome';

import {UserModal} from '../map/screen/userModal'

import matchFunction from '../map/function/matchFunction';

const screen = Dimensions.get('window');


const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.010;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Map extends React.Component {
  logout = () => {
    //_unRegisterAllTasksAsync("background-fetch-location");
    this.props.logout();
    setTimeout(() => {
      
      Actions.reset('login');
    }, 100);
  };
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
                refreshing: false,   
            };
      }

      componentDidMount(){
          this.updateLocationChange();
          setTimeout(this.refresh.bind(this), 1000)
      }
  
      _setMap(ref) {
        this.map = ref
      }
      
      refresh () {
        const finishRefresh = () => setTimeout(() => this.setState({refreshing: false}), 0)
        this.setState({refreshing: true}, finishRefresh)
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
        const {logged} = this.props;
        if(logged){
              var user = firebaseService.auth().currentUser;
              firebaseService.database().ref('/Location/'+user.uid).on('value', (snapshot) => {
                const userObj = snapshot.val();
                this.state.coordinate.setValue(userObj);
                if(this.isUpdate==false){
                this.setState({
                  latitude:userObj.latitude,
                  longitude:userObj.longitude,
                });
                this.isUpdate = true;
              }
              this.updateMarkLocationChange(this.props.user.uid);
              });
         }
       }

       animate(region) {
        const { coordinate } = this.state; 
              if(region != undefined){
                    const newCoordinate = {
                        latitude: region.latitude,
                        longitude: region.longitude,
                    };
                      coordinate.timing(newCoordinate).start();
                }
            else{
                  const newCoordinate = {
                      latitude: LATITUDE,
                      longitude: LONGITUDE,
                  };
                      coordinate.timing(newCoordinate).start();
            }}

            requestMatch(uid,targetuid){
                  matchFunction(uid,targetuid,"request");
            }


      render() {
        const {
          user: { displayName,email,photoURL,uid },
          markLocation,
          locationServiceStatus,
          matches
        } = this.props;
        
        const { refreshing } = this.state;

     

        return (
           <View style={styles.container}>
                <LocationDialog isTrue={locationServiceStatus} />
                    <MapView
                      ref={this._setMap.bind(this)}
                      provider = {PROVIDER_GOOGLE}
                      style={[{flex: 1}, refreshing && styles.refreshing, styles.map]}
                      mapPadding={{ left: 0, right: 0, top: 0, bottom: 115 }}
                      customMapStyle={mapStyle}
                      minZoomLevel={12.4}
                      maxZoomLevel={20}
                      showsCompass={false}
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

                  {this.props.markLocation.map((mark,i) => {
                   
                     
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
                              pinColor={'#7704A7'}>

                                  <MapView.Callout
                                    onPress={()=>this.requestMatch(uid,mark.m_uid)}
                                      >
                        
                                                <Text> Try to catch </Text> 
                                          
                                      
                                  </MapView.Callout>
                             </MapView.Marker> 
                          );
                        }
                        else if(mark.m_uid == this.props.user.uid){
                        /*  return(   
                          <Marker.Animated
                          ref={marker => { this.marker = marker; }}
                          coordinate={{
                            latitude : mark.m_latitude,
                            longitude: mark.m_longitude,
                          }}
                          key ={mark.m_uid}
                          title={this.props.user.uid}
                          description={this.props.user.email}
                          pinColor ={'#ff00c2'}
                        />
                        );*/
                        }

                      })
                     
                  }
         
           </MapView>     
        
        <DownSlidingPanel matches={matches}/>
      
          </View>
        );
      }
}
        
            const mapStateToProps = ({ routes,sessionReducer,mapsReducer:{error,markSuccess,status}}) => ({
              routes: routes,
              user: sessionReducer.user,
              logged: sessionReducer.logged,
              error : error,
              markLocation:markSuccess,
              locationServiceStatus:status,
              matches: sessionReducer.matches,
            });

            const mapDispatchToProps = {
              logout: logoutUser,

            };


            export default connect(
              mapStateToProps,
              mapDispatchToProps,
              
            )(Map);


       