import React, { Component } from 'react';
import { View, Button,Text,Platform,Image,FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles,mapStyle } from './style';
import { Actions } from 'react-native-router-flux';
import * as backgroundTask from '../../backgroundTask/map/backgroundTasks';

import { Constants, MapView,Location,TaskManager } from "expo";
import firebaseService from '@firebase/app';

class Map extends React.Component {
    state = {
      region : null,
      errorMessage : null,
           latitude: 37.78825,
            longitude: -122.4324, 
      };


      componentDidMount(){
        var user = firebaseService.auth().currentUser;
        firebaseService.database().ref('/Location/'+user.uid).on('value', (snapshot) => {
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
          markLocation
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
                   title={"sen"}
                   description={"sen"}/>
        
                  {
                    this.props.markLocation.map((mark,i) => {
                      if(mark.m_uid != {uid}){
                      return(         
                      <MapView.Marker
                        coordinate={{
                          latitude : mark.m_latitude,
                          longitude: mark.m_longitude,
                        }}
                              key = {mark.m_uid}
                              title={mark.m_uid}
                              description={mark.m_uid}/>
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

