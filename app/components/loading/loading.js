import React from 'react';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {  Block, Text } from '../../../assets/themeComponents';

import { theme } from '../../../assets/themeComponents/constants';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';

import { loginUser, restoreSession, fetchMatches, fetchLastMessages, setUserData } from '../../actions/session/actions';
import { setCurrentLocation,AddMark, getReverseGeoCode,setLocationServiceStatus } from '../../actions/maps/actions';
import {_getFetchBackgroundLocationAsync} from '../../backgroundTask/map/backgroundTasks';
//Database
import firebase from '@firebase/app';

var stop = false;

function getWizardState(uid) {
    return new Promise(resolve => {
          firebase.database().ref('/Users/'+uid).on('value', (snapshot) => {
            resolve(snapshot.val().wizardState);
          });
    });
 }


 function getLastMessages(uid,muid){
        return new Promise(resolve =>{
            setTimeout(()=>{
                  let data ={
                      method: 'POST',
                      body: JSON.stringify({
                        uid: uid,
                        muid: muid
                      }),
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      }
                  }
                  return fetch('http://ffa1.lovesvan.com/api/get/lastMessages',data)
                  .then(response => response.json()) //promise
                  .then((json2) =>{
                    if (json2.lastMessage && json2.lastMessage.length) {
                          json2.lastMessage.map((message,i)=>{
                            resolve(message.LastMessage);
                        })
                      }
                      else{
                            resolve(null);
                      }
                  }).catch((error) =>{
                      console.log(error);
                  });
            },100)
        })
    }

    function getMatchProfilePic(matchUid){
      return new Promise(resolve =>{
          setTimeout(()=>{
                let data ={
                    method: 'POST',
                    body: JSON.stringify({
                      _uid: matchUid,
                    }),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }
                }
                return fetch('http://ffa1.lovesvan.com/api/user/getUserData',data)
                .then(response => response.json()) //promise
                .then((json2) =>{
                      if(json2.dataUser.profilePic != "null"){
                      resolve("http://ffa1.lovesvan.com/uploads/profilePic/300x300-"+json2.dataUser.profilePic[0]);
                      }else{
                        resolve(null);
                      }
                }).catch((error) =>{
                    console.log(error);
                });
          },100)
      })
  }

function getMatches(uid){
    return new Promise(resolve =>{
       setTimeout(async ()=>{
         const matchArr = [];
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
            try{
             await fetch('http://ffa1.lovesvan.com/api/get/matches',data)
              .then(response => response.json()) //promise
              .then((json) =>{
                if (json.matches && json.matches.length) {
                  
                  json.matches.map(async (matches,i)=>{
                        matchArr.push({
                          Email: matches.Email,
                          ID: matches.ID,
                          Name: matches.Name,
                          photoURL: await getMatchProfilePic(matches.ID),
                          lastMessage: await getLastMessages(uid,matches.ID)
                        })
                        resolve(matchArr);
                    })
                   
                  }
                })
             }catch(e){
                 resolve(0);
          }
        },100)
   })
}


export class Loading extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           isLoading: false,
           geoInfo:{},
           geoInfoHas : false,
           wizardState: null,
          }
      }
       componentDidMount() {
         this.props.restore();   
         const { error, logged } = this.props; 
      
         this._geoInfo();
    
       }
     
       componentDidUpdate = async (prevProps)=>{
        const { error, logged, loading,user:{uid},registered} = this.props;
        let wizardState = null;
        let matchArr = [];
        let markerArr = [];

        let userData = null;
          if (!prevProps.error && error) Alert.alert('error', error);  
          if(!loading){
            if (logged || registered) {
              wizardState = await getWizardState(uid);  
              console.log("wizard finished");
              await this._getUserData(uid);     
              console.log("getuserdata finished");
              await this._getLocationAsync();
              console.log("get location finished");
              markerArr = await this._getMarksAsync();
              console.log("getmarker finished");
              matchArr = await getMatches(uid);
              console.log("getmatches finished");
              this.props.setMark(markerArr);

              if(matchArr != 0){
              this.props.setMatches(matchArr);
              }

              if(wizardState){                    
                Actions.reset('home');
              }else{
                Actions.reset('signupSteps');   
              }
            }else{
              Actions.reset('welcome');
            }
          }
          else{
            Actions.reset('loading');
          }


            /*if(loading){
            
            }*/
          }

       _geoInfo(){
         if(this.state.geoInfoHas == false){
        return fetch('http://api.ipstack.com/check?access_key=31e9418a9bfe4ff46faee4338a793174')
          .then((response) => response.json())
          .then((responseJson) => {
              this.state.geoInfo=responseJson;
              this.state.geoInfoHas = true;
          }).catch((error) => {
              console.error(error);
          });
        }
      } 
    

  _getUserData(uid){
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
           this.props.setUserData(json.dataUser);
        }).catch((error) =>{
            console.log(error);
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
    
          let { status } =  await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
              this.errorMessage = 'Permission to access location was denied';
            }
          let location =  await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.HIGH,
          }).then((location)=>{
            this.props.setCurrent(location,this.state.geoInfo);
            _getFetchBackgroundLocationAsync(uid,this.state.geoInfo); 
          }).catch((error) => {
            console.log("error !!!!",error);
            if(!serviceLocationStatus)
               this.props.locationServiceStatus(true);
          });
    
      
      }
    
      _getMarksAsync(){
        return new Promise(resolve =>{
        var arrMarker = [];
        var counterOne =0;
              let dataForMarker = {
                method:'POST',
                body: JSON.stringify({
                    //_uid:uid,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
            }
            return fetch('http://ffa1.lovesvan.com/api/get/marker',dataForMarker)
            .then(response => response.json()) //promise
            .then((json) =>{
                json.forEach(function(value){
                  counterOne++;
                  let dataForProfile = {
                    method:'POST',
                    body: JSON.stringify({
                        _uid:value.m_uid,
                    }),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    }
                }
                return fetch('http://ffa1.lovesvan.com/api/user/getUserData',dataForProfile)
                .then(response => response.json()) //promise
                .then((json2) =>{
                    if(json2.dataUser.profilePic != "null"){
                        arrMarker.push({
                          m_uid:value.m_uid,
                          m_longitude:value.m_longitude,
                          m_latitude:value.m_latitude,
                          m_isPremium: value.m_isPremium,
                          m_profilePic: "http://ffa1.lovesvan.com/uploads/profilePic/300x300-"+json2.dataUser.profilePic[0],
                      });
                    }else{
                        arrMarker.push({
                          m_uid:value.m_uid,
                          m_longitude:value.m_longitude,
                          m_latitude:value.m_latitude,
                          m_isPremium: value.m_isPremium,
                          m_profilePic : "https://cdn.dribbble.com/users/1220170/screenshots/5758802/new_avatar_2x.jpg",
                      });
                    }
                    if(counterOne == arrMarker.length){
                      resolve(arrMarker);
                    }
                          
                      }).catch((error) =>{
                          console.log(error);
                      });
                })  
            }).catch((error) =>{
                console.log(error);
            });
          });
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
              <Text h3 gray2 style={{marginTop: theme.sizes.padding / 2}}>
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

  const mapStateToProps = ({ routes, sessionReducer: {user, error, logged,loading,restoring,wizardCompleted,registered} }) => ({
    routes: routes,
    user: user,
    error: error,
    logged: logged,
    loading: loading,
    restoring: restoring,
    registered: registered
  });
  
    const mapDispatchToProps = {
      setCurrent:setCurrentLocation,
      setMark : AddMark,
      locationServiceStatus : setLocationServiceStatus,
      restore: restoreSession,
      setMatches : fetchMatches,
      setLastMessages: fetchLastMessages,
      setUserData : setUserData,
    };

    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Loading);
