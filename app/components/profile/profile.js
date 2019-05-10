import React from 'react';
import {ScrollView, StyleSheet, Dimensions, Platform,Image,View,Text,Button,Alert} from 'react-native';
import { LinearGradient } from 'expo';

// Galio components

import theme from './styles';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session/actions';
import { Actions } from 'react-native-router-flux';

const { width,height } = Dimensions.get('screen');


export class Profile extends React.Component {

  logout = () => {
    //_unRegisterAllTasksAsync("background-fetch-location");
    this.props.logout();
    setTimeout(() => {
      
      Actions.reset('login');
    }, 100);
  };
  render() {
    const { navigation } = this.props;
    return (
          <View style={theme.styles.container}>

            <View style={theme.styles.profileContainer}>
                <View style={theme.styles.profileContentContainer}>
                      <Text style={[{fontFamily:'gotham4'}]}> Hasan Ali Yüzgeç </Text>
                </View>
                
                <View style={theme.styles.profileImageContanier}>
                    <Image source={{uri:'https://e.piclect.com/o171215_5558d.jpg'}} style={theme.styles.profileImage}/>
               </View> 
            </View> 

            <View style={theme.styles.tabContainer}>
            </View> 

            <View style={theme.styles.contentContainer}>
              <Button onPress={this.logout} title="logout"/>
            </View> 

         </View>
    );
  }
}


const mapStateToProps = ({ routes, counterReducer }) => ({
  routes: routes,
 

});

const mapDispatchToProps = {
  logout: logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
