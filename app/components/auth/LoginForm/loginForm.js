import React, { Component } from 'react';
import { Location, Permissions,TaskManager } from "expo";
//Form Components
import { View, Alert, Image, Button,AsyncStorage } from 'react-native';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//Actions
import { setCurrentLocation,AddMark, getReverseGeoCode,setLocationServiceStatus } from '../../../actions/maps/actions';
import { loginUser, restoreSession } from './../../../actions/session/actions';
//import {locationFetcherBackground,markFetcherBackground,backgroundFetcherState} from '../../../actions/maps/backgroundFetcher'
import {_getFetchBackgroundLocationAsync} from '../../../backgroundTask/map/backgroundTasks';
//Redux & Router
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//Functions
import { LocationDialog } from '../../map/function';

//Database
import firebase from '@firebase/app';
//Logo Const
const FIREBASE_LOGO = require('../../../../assets/icons/firebase.png');



class LoginFormComponent extends Component {
  
  

  constructor(props){
    super(props);
    this.state ={
       isLoading: false,
       geoInfo:{},
      }
  }

  componentDidMount() {
    this.props.restore();   
    const { error, logged } = this.props;
    this._geoInfo();
  }

  componentDidUpdate = async (prevProps)=>{
  const { 
    error, logged
  } = this.props;
  
  if (!prevProps.error && error) Alert.alert('error', error);  
  if (logged) {

    this._getLocationAsync();
    this._getMarksAsync();
  
    Actions.reset('home')
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
        accuracy: Location.Accuracy.BestForNavigation,
      })
      .then((location)=>{
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
    const { login, loading } = this.props;
    const { scrollView, imageBox, image, loginBox } = styles;
   

    return (
   
      <KeyboardAwareScrollView style={scrollView}>
      
        <View style={imageBox}>
          <Image style={image} source={FIREBASE_LOGO} />
        </View>
        <View style={loginBox}>
          {loading ? (
            <LoadingIndicator color="#ffffff" size="large" />
          ) : (
            <BasicFormComponent buttonTitle={'login'} onButtonPress={login} />
          )}
        </View>
        <View>{loading ? null : <Button onPress={Actions.signup} title="Signup" />}</View> 
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { restoring, loading, user, error, logged } }) => ({
  routes: routes,
  restoring: restoring,
  loading: loading,
  user: user,
  error: error,
  logged: logged
});

const mapDispatchToProps = {
  login: loginUser,
  restore: restoreSession,
  setCurrent:setCurrentLocation,
  setMark : AddMark,
  locationServiceStatus : setLocationServiceStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);