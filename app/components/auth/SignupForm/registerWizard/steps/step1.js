import React, { Component } from 'react';

import { LinearGradient } from 'expo-linear-gradient';
//Theme
import {Alert, Dimensions, KeyboardAvoidingView, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from '../../styleRegister';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';

const STEP2_IMAGE = require('../../../../../../assets/images/Step2Screen.png');


const { height, width } = Dimensions.get('window');

class Step1 extends Component {
    constructor(props){
      super(props);
      this.state ={
        errorMessage : null,
        ageValid: false,
        date:"2016-05-15"
        }
        this.name = this.props.firstName;
        this.surName = this.props.surName;
    }

      ageControl(date){
        this.setState({date:date});
        var today = new Date();
        var year = date.substring(0, 4);
        var month = date.substring(5,7);
        var day = date.substring(8,10);
        var age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
          age--;
        }
        if(age<18){
          Alert.alert("You are younger than 18. I'am sorry that I can not take you in. ");
          this.setState({ageValid:false});
        }else{
          this.setState({ageValid:true});
        }
      }
 
      render() {
        const { signup, loading } = this.props;
        return (
          <LinearGradient colors={['#E801DA','#610080']} style={[theme.styles.linearGradient,theme.styles.container]}>

            <Block flex center style={{ justifyContent: 'center', alignItems: 'center',marginTop: theme.SIZES.BASE * 3}}>
                <Image
                    style={{width: width/1.2, height: height/1.2,resizeMode:'contain'}}
                    source={STEP2_IMAGE}/>
                    
            </Block>

 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 18,fontWeight: 'bold'}}>
 Hey {this.name} {this.surName}!
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal'}}>
  Let us send you a small gift on your birthday 😊
 </Text>

  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
  <DatePicker
        style={{width: 200,paddingVertical: 40}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1920-01-01"
        maxDate="2019-12-31"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderColor: 'white',
            backgroundColor:'white',
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.ageControl(date)}}
      />
       
       <Block flex bottom>
       
       {this.state.ageValid ? <Button
        round
        color={theme.COLORS.WHITE}
        
        onPress={()=> {Actions.Step2({date:this.state.date,firstName:this.name,surName:this.surName});
        }}>
        <Text center color="#E801DA" size={theme.SIZES.FONT * 0.90}>
          {"Next"}
        </Text>
      </Button> : null } 

    </Block>

  </Block>    
          </LinearGradient>
        );
      }
    }
    
export default Step1;