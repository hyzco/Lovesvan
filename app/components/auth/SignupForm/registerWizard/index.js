import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

//Theme
import {Alert, Dimensions, KeyboardAvoidingView, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from '../styleRegister';
import { Actions } from 'react-native-router-flux';
const STEP1_IMAGE = require('../../../../../assets/images/Step1Screen.png');


const { height, width } = Dimensions.get('window');

class Step1 extends Component {
    constructor(props){
      super(props);
      this.state ={
        errorMessage : null,
       // location:{},
       // geoInfo:{},
       firstName: null,
       surName: null,
       validateName : true,
       validateSurname : true,
        }
    }

      handleChange = (name, value) => {
        alph = /^[a-zA-ZğüşöçİĞÜŞÖÇiıI_ ]+$/
        if(name == 'firstName'){
            if(alph.test(value)){
              this.setState({ [name]: value });
              this.setState({validateName:true});
            }
            else{
              this.setState({[name] : null});
              this.setState({validateName:false});
            }
         }else if(name == 'surName'){
          if(alph.test(value)){
            this.setState({ [name]: value });
            this.setState({validateSurname:true});
          }
          else{
            this.setState({[name] : null});
            this.setState({validateSurname:false});
          }
      }
    }

    
      render() {
        const { signup, loading } = this.props;
        const { firstName, surName } = this.state;
    
        return (
          <LinearGradient colors={['#E801DA','#610080']} style={[theme.styles.linearGradient,theme.styles.container]}>
            
            <Block flex center style={{ justifyContent: 'center', alignItems: 'center',marginTop: theme.SIZES.BASE * 3}}>
                <Image
                    style={{width: width/1.5, height: height/1.5,resizeMode:'contain'}}
                    source={STEP1_IMAGE}/>
                    
            </Block>

 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 18,fontWeight: 'bold'}}>
 Hello welcome to LoveSvan !
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal'}}>
  There are a few minor adjustments before starting. 😊
 </Text>

  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
      <Input
        rounded
        placeholder="Name"
        autoCapitalize="none"
        bgColor="rgba(255, 255, 255, 0.2)"
        placeholderTextColor = {theme.COLORS.WHITE}
        color={theme.COLORS.WHITE}
        style={[{ width: width * 0.9}, this.state.validateName ? { borderColor: theme.COLORS.WHITE} : {borderColor:theme.COLORS.ERROR}]}
        onChangeText={text => this.handleChange('firstName', text)}
      />
      <Input
        rounded
        placeholder="Surname"
        bgColor="rgba(255, 255, 255, 0.2)"
        color={theme.COLORS.WHITE}
        placeholderTextColor = {theme.COLORS.WHITE}
        iconColor = {theme.COLORS.WHITE}
        style={[{ width: width * 0.9}, this.state.validateSurname ? { borderColor: theme.COLORS.WHITE} : {borderColor:theme.COLORS.ERROR}]}
        onChangeText={text => this.handleChange('surName', text)}
      />
       

  <Block flex bottom>
      <Button
        round
        color={ this.state.firstName != null && this.state.surName != null ?  theme.COLORS.WHITE : '#BFBFBF'}
        onPress={()=> {{this.state.firstName != null && this.state.surName != null ? 
      
        Actions.Step1({
          firstName:this.state.firstName,
          surName:this.state.surName
        })
        :
        null
      }
        
        }}>
        <Text center color="#E801DA" size={theme.SIZES.FONT * 0.90}>
        {this.state.firstName != null && this.state.surName != null ? "Next" : "Please Fill" }
        </Text>
      </Button>
    </Block>


    
  </Block>    
          </LinearGradient>
        );
      }
    }
    
export default Step1;