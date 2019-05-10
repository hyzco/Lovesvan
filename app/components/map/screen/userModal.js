import React, { Component } from 'react';
import { IntentLauncherAndroid } from 'expo';
import {Modal,View, Button,Text,Platform,Linking,TouchableHighlight,Alert,StyleSheet } from 'react-native';

export class UserModal extends Component {
state = {

};

render(){
   
        return (
            {...console.log("worked")},
            <View style={styles.container}>
                    <Text>TEST</Text>
            </View>
        );
    }
}

var styles =StyleSheet.create({
    container: {
        flex:1,
        width:300,
        height:200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#ffffff',
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