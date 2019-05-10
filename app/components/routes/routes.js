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

import ProfileContainer from './../profile';
import SessionContainer from './../auth/LoginForm';
import SignupContainer from './../auth/SignupForm';
import TodolistContainer from './../todolist';
import HomeContainer from './../map/'

import LoadingContainer from './../loading/';

import configureStore from '../../store';
import Icons from 'react-native-vector-icons/FontAwesome';



const store = configureStore();
const RouterRedux = connect()(Router);

const iconMessages = () => (
  <Icons name={"comment"} color={"#707070"} solid size={30} />
)

const iconMain = () => (
  <Image style={{width:45,height:45,resizeMode: 'contain'}} source={require('../../../assets/images/lovesvanlogo.png')}/>

)

const iconProfile = () => (
  <Icons name={"user"} color={"#707070"} solid size={30} />
)

export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterRedux navigationBarStyle={styles.navBar} tintColor="#656565" titleStyle={styles.barButtonTextStyle}>
          <Scene key="root" hideNavBar={true}>
            <Scene  key="login" component={SessionContainer} title="Login" initial={true} />
            <Scene key="signup" component={SignupContainer} title="Signup" />

            <Scene key="loading" component={LoadingContainer} title="Loading"  />
            <Scene key="privateRoom" component={PrivateRoomContainer} title="PrivateRoom"  />
           {/*} <Scene key="home" component={HomeContainer} title="Home" />*/}

              <Scene key="home"  tabs tabBarStyle={{backgroundColor:"#ffffff"}} showLabel={false}>               
                          <Scene  key="messages"  icon={iconMessages} component={MessageContainer}  title="Messages"  />                                  
                          <Scene hideNavBar={true} key="home"  icon={iconMain} component={HomeContainer} title="Map" initial/>          
                          <Scene hideNavBar={true} key="profile" icon={iconProfile} component={ProfileContainer} title="Profile" />
              </Scene>


          </Scene>

          
        </RouterRedux>
      </Provider>
    );
  }
}
