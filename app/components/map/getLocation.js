import React, { Component } from 'react';
import {Location, Permissions } from "expo";
import  {setCurrentLocation}  from '../../actions/maps/actions';
import { connect } from 'react-redux';




    
            state = {
                region : null,
                errorMessage : null,
                location: {
                  coords: {
                     latitude: 37.78825,
                      longitude: -122.4324
                    }
                  },
                };


                const _getLocationAsync = async ()=>{
                    let { status } = await Permissions.askAsync(Permissions.LOCATION);
                  
                    if (status !== 'granted') {
                      this.setState({
                        errorMessage: 'Permission to access location was denied',
                      });
                    }
                    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})
                    this.setState({ location: JSON.stringify(location), location, });
                    this.props.setCurrent(location);

             }  
          
          
         export default _getLocationAsync;
