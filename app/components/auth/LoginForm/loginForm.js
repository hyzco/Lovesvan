import React, { Component } from 'react';
import { View, Alert, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import { BasicFormComponent } from '../BasicForm/basicForm';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
import { styles } from '../BasicForm/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { loginUser, restoreSession } from './../../../actions/session/actions';
import { Location, Permissions } from "expo";
import { setCurrentLocation,getMarkLocation } from '../../../actions/maps/actions';

const FIREBASE_LOGO = require('../../../../assets/icons/firebase.png');

class LoginFormComponent extends Component {
  state = {
    errorMessage : null,
    location:{},
    };

  componentDidMount() {
    this.props.restore();
   var location = this._getLocationAsync();
  }

  
  _getLocationAsync = async ()=>{
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
  
    if (status !== 'granted') {
      this.errorMessage = 'Permission to access location was denied';
    }
 
    let location =  await Location.getCurrentPositionAsync({enableHighAccuracy:true})
    .then((location)=>{
      this.location = ( JSON.stringify(location), location);
    })
   
    if(this.location){
      this.props.setCurrent(this.location);
    }
  }


  componentDidUpdate(prevProps) {
    const { error, logged } = this.props;
    if (!prevProps.error && error) Alert.alert('error', error);
    if (logged) {
      Actions.reset('home')
    };
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
  getMark:getMarkLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
