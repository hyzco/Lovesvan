import React from 'react';
import {Location, Permissions} from "expo";

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Button, Block, Text } from '../../../assets/themeComponents';
import { theme } from '../../../assets/themeComponents/constants';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';

import { loginUser, restoreSession, fetchMatches } from '../../actions/session/actions';
import { setCurrentLocation,AddMark, getReverseGeoCode,setLocationServiceStatus } from '../../actions/maps/actions';
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
        const { error, logged, loading,user:{uid}} = this.props;
          if (!prevProps.error && error) Alert.alert('error', error);  
            if (logged) {
              this._getMatches(uid);
              this._getLocationAsync();
              this._getMarksAsync();
              Actions.reset('home');
            }else{
              Actions.reset('welcome');
            }

            if(loading){
              Actions.reset('loading');
            }
          }


          _getMatches(uid){
            console.log("getmatch");
              let {matches} = this.state; 
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
                  return fetch('http://ffa1.lovesvan.com/api/get/matches',data)
                  .then(response => response.json()) //promise
                  .then((json) =>{
                    /*
                      json.matches.map((matches,i) => {
                        console.log(matches.ID);
                      })*/
                        this.props.setMatches(json.matches);

                  }).catch((error) =>{
                      console.log(error);
                  });
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
        
          
           
          <Block style={{backgroundColor:'#f3f3f3'}}>
            <Block center bottom flex={0.4}>
              <Text h1 center bold>
                Love nest.
                <Text h1 primary> LoveSvan</Text>
              </Text>
              <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
                Find your soulmate. 💖
              </Text>
            </Block>
            <Block center middle>
            <LoadingIndicator color="#E801DA" size="large" />
            </Block>
          </Block>
       
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
        setMatches : fetchMatches,
    };

    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Loading);
