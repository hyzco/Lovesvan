import React, { Component } from 'react';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { LinearGradient } from 'expo-linear-gradient';
import * as IntentLauncher from 'expo-intent-launcher';

//Theme
import {Alert, Dimensions, KeyboardAvoidingView, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from '../../styleRegister';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';

const STEP2_IMAGE = require('../../../../../../assets/images/Step3Screen.png');


const { height, width } = Dimensions.get('window');

class Step2 extends Component {
    constructor(props){
      super(props);
      this.state ={
        errorMessage : null,
       // location:{},
        validLocation: false,
        }
        this.name = this.props.firstName;
        this.surname = this.props.surName;
        this.date = this.props.date;
       
    }

  openLocationServices(){
      if(Platform.OS == 'ios' ){
        Linking.openURL('app-settings:')
        }
        else{
          IntentLauncher.startActivityAsync(
            IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
            )
        }

       var lanucherResult = new Promise(function(resolve,reject){
          setTimeout(function(){
            resolve(IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS));
          },300);
      });
      
      lanucherResult.then(function(value){   
          console.log("lanucherresult",value);
      });

      
      this.setState({validLocation:true});
  }

  _getLocationAsync = async ()=>{
      var statusService = new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(Location.hasServicesEnabledAsync());
        },300);
    });
    var serviceLocationStatus = null;
     statusService.then(function(value){   
        serviceLocationStatus = value;
    });


      let { status } = await Permissions.askAsync(Permissions.LOCATION); 
        if (status !== 'granted') {
          this.errorMessage = 'Permission to access location was denied';
        }
      let location =  await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.HIGH,
      }).then((location)=>{
        this.location = ( JSON.stringify(location), location);
      }).catch((error) => {
        if(!serviceLocationStatus){}
          // this.props.locationServiceStatus(true);
      });

        if(this.location && this.props.logged){
         // this.props.setCurrent(this.location,this.state.geoInfo);
        //  _getFetchBackgroundLocationAsync(uid,this.state.geoInfo); 
      }
  }
  

      handleChange = (name, value) => {
        this.setState({ [name]: value });
      }

      render() {
        const { signup, loading } = this.props;
        const { email, password } = this.state;
    
        return (
          <LinearGradient colors={['#E801DA','#610080']} style={theme.styles.linearGradient}>
            <KeyboardAvoidingView style={theme.styles.container} behavior="padding" disabled>
            
            <Block flex center style={{ justifyContent: 'center', alignItems: 'center',marginTop: theme.SIZES.BASE * 3}}>
                <Image
                    style={{width: width/1.6, height: height/1.6,resizeMode:'contain'}}
                    source={STEP2_IMAGE}/>
                    
            </Block>

 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 18,fontWeight: 'bold',marginTop:35}}>
{this.name}, can you help us to find you ? 
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
  We will help you to find your soulmates near to you. 😏 
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
  Don't worry, we do not storage your location data. 
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
 Also we do not show your exact location to people. 🤫
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
  You will be near to your exact location but not exactly. 
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
  Just you can see your real location.
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal',marginTop:5}}>
 We will hide you for your safety ! 😎
 </Text>



  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
  <Block flex bottom>
  <Button
        round
        color={theme.COLORS.WHITE}
        
        onPress={()=> {this.state.validLocation ? Actions.Step3({firstName: this.name,lastName:this.surname,date:this.date}) : this.openLocationServices() /*this._getLocationAsync();
          this.location = _getFetchBackgroundLocationAsync();*/
        }}>
        <Text center bold color="#E801DA" size={theme.SIZES.FONT * 0.90}>
          { this.state.validLocation ? "Next " : "Enable location services"}
        </Text>
      </Button>
    </Block>
       

    
  </Block>
</KeyboardAvoidingView>
    
          </LinearGradient>
        );
      }
    }
    
export default Step2;