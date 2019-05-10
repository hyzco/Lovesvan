import React from 'react';
import {View} from 'react-native';
import { Location, Permissions,TaskManager,LinearGradient} from "expo";
import { setCurrentLocation,AddMark, getReverseGeoCode,setLocationServiceStatus } from '../../actions/maps/actions';
import theme from '../auth/LoginForm/styleLogin';
import { loginUser, restoreSession } from '../../actions/session/actions';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';

import {_getFetchBackgroundLocationAsync} from '../../backgroundTask/map/backgroundTasks';
//Database
import firebase from '@firebase/app';


export class Loading extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           isLoading: false,
           geoInfo:{},
           email: '',
           password: '',
          }
      }
    componentDidMount() {
         this.props.restore();   
         const { error, logged } = this.props;
         this._geoInfo();
        
       }
     
     componentDidUpdate = async (prevProps)=>{
         const { error, logged, loading} = this.props;
           if (!prevProps.error && error) Alert.alert('error', error);  
             if (logged) {
              this._getLocationAsync();
              this._getMarksAsync();
               Actions.reset('home');
              if(loading){
                 console.log("loading");
                 Actions.reset('loading');
               }
             };
         
       }

       _geoInfo(){
        return fetch('https://ipapi.co/json')
          .then((response) => response.json())
          .then((responseJson) => {
              this.state.geoInfo=responseJson;
          }).catch((error) => {
              console.error(error);
          });
      } 
    
      _getLocationAsync = async ()=>{
        this.props.locationServiceStatus(false);   
          var statusService = new Promise(function(resolve,reject){
            setTimeout(function(){
              resolve(Location.hasServicesEnabledAsync());
            },300);
        });
        var serviceLocationStatus = null;
         statusService.then(function(value){   
            serviceLocationStatus = value;
        });
    
        const {user:{uid}} = this.props;
        let {isAvailable} = this.state;
    
          let { status } = await Permissions.askAsync(Permissions.LOCATION); 
            if (status !== 'granted') {
              this.errorMessage = 'Permission to access location was denied';
            }
          let location =  await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.HIGH,
          }).then((location)=>{
            this.location = ( JSON.stringify(location), location);
          }).catch((error) => {
            if(!serviceLocationStatus)
               this.props.locationServiceStatus(true);
          });
    
            if(this.location && this.props.logged){
              this.props.setCurrent(this.location,this.state.geoInfo);
              _getFetchBackgroundLocationAsync(uid,this.state.geoInfo); 
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
          this.props.setMark(arrMarker);
        })
      }

  render() {
      const {user} = this.props;
    return (
        <LinearGradient colors={['#E801DA','#610080']} style={theme.styles.linearGradient}>
            <LoadingIndicator color="#ffffff" size="large" />
           
            
        </LinearGradient>
    );
  }
}

  const mapStateToProps = ({ routes, sessionReducer: {user, error, logged,loading,restoring } }) => ({
    routes: routes,
    user: user,
    error: error,
    logged: logged,
    loading: loading,
    restoring: restoring,
  });
  
    const mapDispatchToProps = {
        setCurrent:setCurrentLocation,
        setMark : AddMark,
        locationServiceStatus : setLocationServiceStatus,
        restore: restoreSession,

    };

    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Loading);
