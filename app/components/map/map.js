import React, { Component } from 'react';
import { Text,Image,StyleSheet,Dimensions,ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { styles,mapStyle } from './style';
import { Actions } from 'react-native-router-flux';

import MapView, {ProviderPropType,AnimatedRegion, Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import theme from './screen/theme'

import firebaseService from '@firebase/app';
import {LocationDialog} from '../map/screen/LocationModal';
import DownSlidingPanel from './screen/DownSlidingPanel';
import TopPanelOnMap from './screen/TopPanelOnMap';
import {Block} from 'galio-framework';
import {Profile} from './screen/Profile';
import Modal from 'react-native-modal';
import { AddMark } from '../../actions/maps/actions';

const io = require('socket.io-client');
const SOCKET_URL = 'http://ffa1.lovesvan.com:3000';
const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

const screen = Dimensions.get('window');



const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.025;
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
        this.state = {
          errorMessage : null,
          latitude: LATITUDE,
          longitude: LONGITUDE,
                coordinate: new AnimatedRegion({
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    longitudeDelta: LONGITUDE_DELTA,
                    latitudeDelta: LATITUDE_DELTA,
                }),
                refreshing: false,   
          userData:this.props.userData,
          visibleModal: null,
          showingUserID: null,
          showingUserData:{},
          images: [],
          widthImageBox: null,
      }
    }

      componentDidMount(){
          this.updateLocationChange();
          setTimeout(this.refresh.bind(this), 1000)
      }
      
      realTimeUpdateMarker(uid){
        socket.emit('setMarkerRequest',{filter:null,pref:null});
        socket.on('getMarkerData', (data)=>{
          console.log("socketio",data);
          this.props.setMark(data);
        })
    }

    
      _setMap(ref) {
        this.map = ref
      }
      
      refresh () {
        const finishRefresh = () => setTimeout(() => this.setState({refreshing: false}), 0)
        this.setState({refreshing: true}, finishRefresh)
      }
    

      updateMarkLocationChange(uid){
        try{
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
              console.log("updatemarklocation",json.newLocation);
                this.animate(json.newLocation);  
            }
            
            },function(){
            }).catch((error) =>{
                console.log(error);
            });
        },300);
      }catch(e){
        console.log(e);
      }
      }
      

     isUpdate = false;
      updateLocationChange(){
        try{
        const {logged} = this.props;
        if(logged){
              var user = firebaseService.auth().currentUser;
              firebaseService.database().ref('/Location/'+user.uid).on('value', (snapshot) => {
                const userObj = snapshot.val();
                var userMarkLocation = {
                  latitude : userObj.latitude,
                  longitude : userObj.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }               
                this.state.coordinate.setValue(userMarkLocation);
                if(this.isUpdate==false){
                  //set state çözüm bul arada gümlüyor
                this.setState({
                  latitude:userObj.latitude,
                  longitude:userObj.longitude,
                });
                this.isUpdate = true;
              }
              console.log("testUpdateLocation OK");
              this.realTimeUpdateMarker();
              this.updateMarkLocationChange(this.props.user.uid);
              });
         }
        }catch(e){
            console.log("err2",e);
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

          
       
            getShowingUserData(uid,e){
                let nativeEvent = e.nativeEvent;
                let data = {
                      method:'POST',
                      body: JSON.stringify({
                          _uid:uid,
                      }),
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      }
                  }
                  return fetch('http://ffa1.lovesvan.com/api/user/getUserData',data)
                  .then(response => response.json()) //promise
                  .then((json) =>{
                      this.setState({
                        showingUserData:json.dataUser,   
                        visibleModal:'userRenderModal',
                        latitude: nativeEvent.coordinate.latitude,
                        longitude: nativeEvent.coordinate.longitude,                   
                      });
                  }).catch((error) =>{
                      console.log(error);
                  });
            }
            
            onLayout = e => {
              this.setState({
                widthImageBox: e.nativeEvent.layout.width
              });
          };

          mapImage = function(isPremium) {
            var colorBorder = null;
            if(isPremium){
                colorBorder = "#fccf00";
            }else{
                colorBorder = "#ff00c2";
            }
            return {
                width:45,
                height:45,
                borderRadius:45/2,
                borderColor:colorBorder,
                borderWidth:2.5,
            }
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
           <Block style={styles.container}>
          {/*}     <LocationDialog isTrue={locationServiceStatus} />*/}

                <Block style={stylesModal.container}>            
                    <Modal
                        isVisible={this.state.visibleModal === 'userRenderModal'}
                        onBackdropPress={() => this.setState({visibleModal: null})}
                        onBackButtonPress={()=>this.setState({visibleModal: null})}>
                        <Block style={stylesModal.content} onLayout={this.onLayout}>
                        <ScrollView style={{flex:1,width:this.state.widthImageBox}} showsVerticalScrollIndicator={false}>
                      
                      
                            <Profile data={this.state.showingUserData} userData={uid} />


                        </ScrollView>
                        </Block>
                    </Modal>
              </Block>

                    <MapView
                      ref={this._setMap.bind(this)}
                     // showsUserLocation={true}
                      
                      followsUserLocation={true}
                      provider = {PROVIDER_GOOGLE}
                      style={[refreshing && styles.refreshing, styles.map]}
                      mapPadding={{ left: 0, right: 0, top: 0, bottom: 115 }}
                      customMapStyle={mapStyle}
                      minZoomLevel={10.4}
                      maxZoomLevel={20}
                      showsCompass={false}
                      showsMyLocationButton = {true}
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
                          description={"IT IS YOU !"}
                          pinColor ={'#ff00c2'}
                      />

                  {this.props.markLocation.map((mark,i) => {
                   
                     
                      if(mark.m_uid != this.props.user.uid){
                      return(         
                      <MapView.Marker
                        coordinate={{
                          latitude : mark.m_latitude,
                          longitude: mark.m_longitude,
                        }}
                            
                                key = {mark.m_uid}
                                pinColor={'#7704A7'}
                                onPress={(e)=> {
                                  this.getShowingUserData(mark.m_uid,e);
                               }}
                               >
                                 <Image
                                    source={{uri:mark.m_profilePic}}
                                    style={this.mapImage(mark.m_isPremium)}
                                  />
                                    
                             </MapView.Marker> 
                          );
                        }
                    
                      })
                     
                  }
         
           </MapView> 

           <Block  style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '5%', //for center align
            alignSelf: 'center' //for align to right
        }}>
           <TopPanelOnMap userData={this.state.userData} userID={firebaseService.auth().currentUser}/>
        </Block>

            <Block  style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '100%', //for center align
            alignSelf: 'center' //for align to right
        }}>
             <DownSlidingPanel />
          </Block>
           
      
          </Block>
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
              userData: sessionReducer.userData,
            });

            const mapDispatchToProps = {
              setMark: AddMark
            };


            export default connect(
              mapStateToProps,
              mapDispatchToProps,
              
            )(Map);


       
    const stylesModal = StyleSheet.create({
      container: {
       // flex: 1,        
      },
      content: {
        height:screen.height/2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },

    })
  