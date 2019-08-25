import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import matchFunction from '../function/matchFunction';

const screen = Dimensions.get('window');

export  class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            userData: this.props.data,
            borderColor: "white",
            mainUserData: this.props.userData,
        }
    }

        requestMatch(uid,targetuid){
          matchFunction(uid,targetuid,"request");
      }

    circleMood = function(moodColor) {
        return {
            height:30,
            width:30,
            borderRadius:30/2,
            backgroundColor: moodColor,
            marginHorizontal: 5,
        }
      }
    

  render() {
    var age = (new Date().getFullYear())-(this.state.userData.dateOfBirth.split("-")[0]);
    return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Image style={{height:200,width:screen.width}} source={{uri: 'https://wallup.net/wp-content/uploads/2018/03/19/592298-California-USA-road-sunlight-street-sunset-worms_eye_view-300x200.jpg'}}/>
          </View>
          <Image style={styles.avatar} source={{uri: 'http://ffa1.lovesvan.com/uploads/profilePic/300x300-'+this.state.userData.profilePic[0]}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
                <View style={{alignItems:'center',flexDirection:'row'}}>
                    <Text style={styles.name}>{this.state.userData.name}{this.state.userData.surname} {age}</Text>
                    <View style={this.circleMood(this.state.userData.moodColor)} />
             </View>
              <Text style={styles.info}>UX Designer / Mobile developer</Text>
              <Text style={styles.description}>{this.state.userData.moodState}</Text>
              
              <TouchableOpacity style={styles.buttonContainer}
               onPress={()=>this.requestMatch(this.state.mainUserData,this.state.userData.uid)}>
                <Text>CATCH !</Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Opcion 2</Text> 
    </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:22,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  circleMood:{
 
  }
});
 