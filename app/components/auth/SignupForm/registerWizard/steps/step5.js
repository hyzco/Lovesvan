import React, { Component } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
//Theme
import {Switch} from '../../../../../../assets/themeComponents';
import { Actions } from 'react-native-router-flux';

import {Alert, Dimensions, KeyboardAvoidingView, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from '../../styleRegister';
import { RadioGroup } from 'react-native-btr';

const STEP2_IMAGE = require('../../../../../../assets/images/Step4Screen.png');


const { height, width } = Dimensions.get('window');

class Step5 extends Component {
    constructor(props){
      super(props);
      this.state ={

    }
}
    componentDidUpdate(prevProps) {
      
    }

      render() {
    
        return (
          <LinearGradient colors={['#E801DA','#610080']} style={theme.styles.linearGradient}>
            <KeyboardAvoidingView style={theme.styles.container} behavior="padding" disabled>
            
            <Block flex center style={{ justifyContent: 'center', alignItems: 'center',marginTop: theme.SIZES.BASE * 3}}>
                <Image
                    style={{width: width/1.6, height: height/1.6,resizeMode:'contain'}}
                    source={STEP2_IMAGE}/>
                    
            </Block>

 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 18,fontWeight: 'bold'}}>
Thank you, we can start !
 </Text>


  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
 
 <Button
 round
 color =  {theme.COLORS.WHITE}
 onPress={()=>Actions.reset("loading")}>
  <Text center bold color="#E801DA" size={theme.SIZES.FONT * 0.90}>
        Finish 
        </Text>
</Button> 
       
   
  </Block>
</KeyboardAvoidingView>
    
          </LinearGradient>
        );
      }
    }
    
export default Step5;