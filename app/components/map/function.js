import React, { Component } from 'react';
import { IntentLauncherAndroid } from 'expo';
import {Modal,View, Button,Text,Platform,Linking,TouchableHighlight,Alert,StyleSheet } from 'react-native';

export class LocationDialog extends Component {
state = {
    modalVisible: false,
    openSetting:false,
    check:false,
};

render(){

if(this.props.isTrue && this.state.check == false){
    this.state.modalVisible = true;
    this.state.check = true;
}    

  return (
    <View style={{marginTop: 22}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Your location service seen is disabled.</Text>

            <TouchableHighlight
              onPress={() => {
                this.openSetting();
              }}
              style={styles.button}>
              <Text>Open Location Services</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
    
    }

   openSetting = () =>{
        if(Platform.OS == 'ios' ){
            Linking.openURL('app-settings:')
        }
        else{
            IntentLauncherAndroid.startActivityAsync(
                IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            )
        }
        this.setState({modalVisible: false});
    }

}

var styles =StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },box:{
        backgroundColor :'#FFFFFF',
        borderRadius: 5,
        width:300,
        height:200,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#2299ec'
    }
})