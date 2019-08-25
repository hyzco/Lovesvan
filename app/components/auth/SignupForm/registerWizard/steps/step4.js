import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import firebaseService from '@firebase/app';
import { Actions } from 'react-native-router-flux';

export default class Step4 extends Component {
  
  constructor(props){
    super(props);
    this.state={
      image:null,
      uploading:false,
    }
    this.name=this.props.firstName;
    this.surname= this.props.lastName;
    this.date= this.props.date;
    this.gender= this.props.gender;
    this.preferenceMan = this.props.preferenceMan;
    this.preferenceWoman = this.props.preferenceWoman;
    var user = firebaseService.auth().currentUser;
    this.uid = user.uid;  
  }


_sendUserDataToFirebase(
  name,
  surname,
  date,
  gender,
  preferenceMan,
  preferenceWoman,
  uid
){
    fetch('http://ffa1.lovesvan.com/api/user/writeData', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _uid : uid,
        _name : name,
        _surname : surname,
        _date : date,
        _gender : gender,
        _prefman : preferenceMan,
        _prefwoman : preferenceWoman,
      }),
    });
    Actions.Step5();
}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <Text
          style={styles.exampleText}>
          Example: Upload ImagePicker result
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />
        <Button onPress={this._takePhoto} title="Take a photo" />
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
        <Button
        onPress={()=>this._sendUserDataToFirebase(this.name,this.surname,this.date,this.gender,this.preferenceMan,this.preferenceWoman,this.uid)}
        title="Finish" />

      </View>
    );
  };

  _share = () => {
    Share.share({
      title: 'Check out this photo',
      message: "New app Lovesvan",
      url: this.state.image,
      type:"image/jpeg",
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    let pickerResult;

    // only if user allows permission to camera roll
    
    try{
    if (cameraRollPerm === 'granted') {
     pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }
  }catch(e){

  }finally{
    this._handleImagePicked(pickerResult);
  }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
      }
    } catch (e) {
      if(uploadResponse.status != 200){
        alert('Upload failed, sorry :(');
      }
    } finally {
    
      if(!pickerResult.cancelled){
      this.setState({
        image:pickerResult.uri,
        uploading: false

      });
      if(uploadResponse.status == 200){
        alert('upload success');
      }
    }else{
      this.setState({
        uploading: false
      });
    }
  }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = 'http://ffa1.lovesvan.com/uploadProfilePic';

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photoProfile', {
    uri,
    name: this.uid,
    type: `image/jpeg`,
    
  });
console.log("step4",formData);
  let options = {
    method: 'POST',
    body: formData,
        headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return await fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});