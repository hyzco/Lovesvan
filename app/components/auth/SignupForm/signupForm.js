import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { signupUser } from '../../../actions/session/actions';
import {_getFetchBackgroundLocationAsync} from '../../../backgroundTask/map/backgroundTasks';
import { Location, Permissions } from "expo";
import { setCurrentLocation } from '../../../actions/maps/actions';

const FIREBASE_LOGO = require('../../../../assets/icons/firebase.png');

class SignupFormComponent extends Component {
  state = {
    errorMessage : null,
    location:{},
    };



  componentDidUpdate(prevProps) {
    if (this.props.registered) Actions.reset('home'); 
  }

  _getLocationAsync = ()=>{
    let { status } =  Permissions.askAsync(Permissions.LOCATION);
  
    if (status !== 'granted') {
      this.errorMessage = 'Permission to access location was denied';
    }
 
    let location =   Location.getCurrentPositionAsync({enableHighAccuracy:true})
    .then((location)=>{
      this.location = ( JSON.stringify(location), location);
    })
   
    if(this.location){
    this.props.setCurrent(this.location);
    }
  }


  render() {
    const { signup, loading } = this.props;
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
            <BasicFormComponent buttonTitle={'signup'} onButtonPress={signup}   onPress={() => {
              this._getLocationAsync();
              this.location = _getFetchBackgroundLocationAsync();
            }} />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer: { loading, error, registered } }) => ({
  routes: routes,
  loading: loading,
  error: error,
  registered: registered
});

const mapDispatchToProps = {
  signup: signupUser,
  setCurrent:setCurrentLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupFormComponent);
