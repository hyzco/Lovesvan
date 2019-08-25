import React, { Component } from 'react';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
//Fotm Components
import {Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from './styleLogin';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
//React Redux - Rotuer Flux
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//Actions
import { setCurrentLocation,AddMark, getReverseGeoCode,setLocationServiceStatus } from '../../../actions/maps/actions';
import { loginUser, restoreSession, fetchMatches } from './../../../actions/session/actions';
//import {locationFetcherBackground,markFetcherBackground,backgroundFetcherState} from '../../../actions/maps/backgroundFetcher'
import {_getFetchBackgroundLocationAsync} from '../../../backgroundTask/map/backgroundTasks';
//Database
import firebase from '@firebase/app';

import {Loading} from '../../loading';

//Logo Const
const LOVESVAN_LOGO = require('../../../../assets/images/lovesvanlogowhite.png');
//Window Const
const { height, width } = Dimensions.get('window');

class LoginFormComponent extends Component {

  constructor(props){
    super(props);
    this.state ={
       isLoading: false,
       email: '',
       password: '',
       matches : []
      }
  }

  componentDidMount() {
    this.props.restore();      
  }

  componentDidUpdate = async (prevProps)=>{
    const { error, logged, loading} = this.props;
      if (!prevProps.error && error) Alert.alert('error', error);  
        if (logged) {
          Actions.reset('loading');
        };
  }




  handleChange = (name, value) => {
       this.setState({ [name]: value });
  }

      render() {
        
        const { login, loading } = this.props;
        const { email, password } = this.state;     
       return(
         
          <LinearGradient colors={['#E801DA','#610080']} style={theme.styles.linearGradient}>

            <KeyboardAvoidingView style={theme.styles.container} behavior="padding" disabled>
                <Block flex center style={theme.styles.blockMain}>
                    <Image
                        style={{width: width/4.5, height: height/4.5,resizeMode:'contain'}}
                        source={LOVESVAN_LOGO} />
                </Block>
                      {loading ?  <LoadingIndicator color="#ffffff" size="large" />: null }
        
                 <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
                      <Input
                        rounded
                        type="email-address"
                        placeholder="Email"
                        autoCapitalize="none"
                        bgColor="rgba(255, 255, 255, 0.2)"
                        color={theme.COLORS.WHITE}
                        placeholderTextColor = {theme.COLORS.WHITE}
                        style={{width: width * 0.9 , borderColor: theme.COLORS.WHITE}}
                        onChangeText={text => this.handleChange('email', text)}
                      />
                      <Input
                        rounded
                        password
                        viewPass
                        placeholder="Password"
                        bgColor="rgba(255, 255, 255, 0.2)"
                        color={theme.COLORS.WHITE}
                        placeholderTextColor = {theme.COLORS.WHITE}
                        iconColor = {theme.COLORS.WHITE}
                        style={{ width: width * 0.9 , borderColor: theme.COLORS.WHITE}}
                        onChangeText={text => this.handleChange('password', text)}
                      />
                      <Text
                        color={theme.COLORS.WHITE}
                        size={theme.SIZES.FONT * 0.75}
                        onPress={() => Alert.alert('Not implemented')}
                        style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2   }}
                      >
                        Forgot your password?
                      </Text>
  
                  <Block flex bottom>
                    <Button
                      round
                      color={theme.COLORS.WHITE}
                      onPress={() => this.props.login(email,password)}>  
                      <Text center color="#E801DA" size={theme.SIZES.FONT * 0.90}>
                        {"Sign In"}
                      </Text>
                    </Button>

                    <Button color="transparent" shadowless onPress={Actions.signup}>
                      <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
                        {"Don't have an account? Sign Up"}
                      </Text>
                    </Button>
                  </Block>
               </Block>
       
        </KeyboardAvoidingView>
     </LinearGradient>
   );
  }
}
    

const mapStateToProps = ({ routes, sessionReducer: { restoring, loading, user, error, logged,matches} }) => ({
  routes: routes,
  restoring: restoring,
  loading: loading,
  user: user,
  error: error,
  logged: logged,
  matches: matches,
});

const mapDispatchToProps = {
  login: loginUser,
  restore: restoreSession,
  setCurrent:setCurrentLocation,
  setMark : AddMark,
  locationServiceStatus : setLocationServiceStatus,
  setMatches: fetchMatches,
    };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

