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

  constructor(props){
    super(props);
    this.state ={
      errorMessage : null,
      location:{},
      geoInfo:{},
      }
  }

  componentDidMount(){
    this._geoInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.registered) 
    {
      this._getLocationAsync();
      Actions.reset('home');
    } 
  }

  _getLocationAsync = async ()=>{
    let { status } =  await Permissions.askAsync(Permissions.LOCATION);
  
    if (status !== 'granted') {
      this.errorMessage = 'Permission to access location was denied';
    }else{
      console.log("ok");
    }
 
    let location =  await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    })
    .then((location)=>{
      this.location = ( JSON.stringify(location), location);
    })
   
    if(this.location||this.props.registered){
    this.props.setCurrent(this.location,this.state.geoInfo);
    }
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
