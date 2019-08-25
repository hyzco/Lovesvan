import React, { Component } from 'react';
import { styles } from './styles';
import { Scene, Router } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import {
  Image,
} from 'react-native';

//import HomeContainer from './../home';
import MessageContainer from './../message';
import PrivateRoomContainer from './../message/privateRoom/message';

import WelcomeContainer from '../Welcome'

import ProfileContainer from './../profile';
import SettingsContainer from './../profile/screens/settings';

import SignupContainer from './../auth/SignupForm';
import StepWizardContainer from './../auth/SignupForm/registerWizard';
import Step1WizardContainer from './../auth/SignupForm/registerWizard/steps/step1';
import Step2WizardContainer from './../auth/SignupForm/registerWizard/steps/step2';
import Step3WizardContainer from './../auth/SignupForm/registerWizard/steps/step3';
import Step4WizardContainer from './../auth/SignupForm/registerWizard/steps/step4';
import Step5WizardContainer from './../auth/SignupForm/registerWizard/steps/step5';


import SessionContainer from './../auth/LoginForm';
import TodolistContainer from './../todolist';
import HomeContainer from './../map/'

import LoadingContainer from './../loading/';

import configureStore from '../../store';
import Icons from 'react-native-vector-icons/FontAwesome';


import FetchFeed from './../map/screen/FetchFeed';


const store = configureStore();
const RouterRedux = connect()(Router);

const iconMessages = () => (
  <Icons name={"comment"} color={"#707070"} solid size={25} />
)
const iconMain = () => (
  <Image style={{width:75,height:75,resizeMode: 'contain'}} source={require('../../../assets/images/illustration_1_logo.png')}/>
)
const iconProfile = () => (
  <Icons name={"user"} color={"#707070"} solid size={25} />
)


export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux navigationBarStyle={styles.navBar} tintColor="#af01b4" titleStyle={styles.barButtonTextStyle}>
          <Scene key="root" hideNavBar={true}>
        
            <Scene  key="login" hideNavBar={true} component={SessionContainer}  />

            <Scene key="signup" component={SignupContainer} title="Signup" />
              {/* Signup Steps  */}
              <Scene key ="signupSteps" component={StepWizardContainer} title="Signup"/>
              <Scene key ="Step1" hideNavBar={false} component={Step1WizardContainer} title="Birthday"/>
              <Scene key ="Step2" hideNavBar={false} component={Step2WizardContainer} title="Location Service"/>
              <Scene key ="Step3" hideNavBar={false} component={Step3WizardContainer} title="Gender"/>
              <Scene key ="Step4" hideNavBar={false} component={Step4WizardContainer} title="Picture"/>
              <Scene key ="Step5" hideNavBar={false} component={Step5WizardContainer} title="Be Happy !"/>

            <Scene key ="FetchFeed" hideNavBar={true} component={FetchFeed} initial={false} title="Feed"/>


            <Scene  key="welcome" component={WelcomeContainer} title="welcome"/>
            <Scene key="loading" component={LoadingContainer} title="Loading"  initial={true}   />

            <Scene key="privateRoom" component={PrivateRoomContainer} title="PrivateRoom"  />
           {/*} <Scene key="home" component={HomeContainer} title="Home" />*/}

            <Scene key="settings" hideNavBar={false} component={SettingsContainer} title="Settings"  />

              <Scene key="home"  tabs tabBarStyle={{backgroundColor:"#ffffff"}} showLabel={false}>               
                          <Scene  key="messages"  icon={iconMessages} component={MessageContainer}  title="Messages"  />                                  
                          <Scene hideNavBar={true}  key="home"  icon={iconMain} component={HomeContainer} title="Map" initial/>          
                          <Scene hideNavBar={false} key="profile" icon={iconProfile} component={ProfileContainer} title="Profile" />
              </Scene>


          </Scene>

          
        </RouterRedux>
      </Provider>
    );
  }
}
