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

class Step3 extends Component {
    constructor(props){
      super(props);
      this.state ={
        errorMessage : null,
            radioButtons: [
              {
                label: 'Woman',
                value: 'Woman',
                checked: true,
                color: 'black',
              },
              {
                checked: false,
                color: 'black',
                value: 'Man',
                label: 'Man',
              }
            ],        
            preferenceMan: false,
            preferenceWoman: false,
            gender: null,
        }
              
        this.name = this.props.firstName;
        this.surname = this.props.lastName;
        this.date = this.props.date;
    }

    componentDidUpdate(prevProps) {
      
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
    alignItems: 'center',fontSize: 18,fontWeight: 'bold'}}>
Tell us with whom you want to talk ?
 </Text>
 <Text style={{color:"white",justifyContent: 'center',
    alignItems: 'center',fontSize: 15,fontWeight: 'normal'}}>
  Wich gender describes you ? 😊
 </Text>

  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
       <Block style={{backgroundColor:'#fff',height:100,width:width/3,marginTop: 10,borderRadius: 5,}}>
            <Block style={{flex:1,justifyContent: 'center',alignItems: 'flex-start',}}>
                <RadioGroup 
                style={{marginVertical: 10,left:5}}
                color='#610080'
                labelStyle={{fontSize: 14}}
                radioButtons={this.state.radioButtons}
                onPress={radioButtons => this.setState({radioButtons})}
              />
            </Block>
     </Block>
      <Text style={{color:"white",justifyContent: 'center',
          alignItems: 'center',fontSize: 15,marginTop: 10,}}>
        What is your gender preference ? 
      </Text>
        <Block style={{backgroundColor:'#fff',height:100,width:width/3,marginTop: 10,borderRadius: 5}}>
          <Block style={{flex:1, flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',marginTop: 15}}>
            <Switch
                value={this.state.preferenceMan}
                onValueChange={value => this.setState({ preferenceMan: value })}
              />
              <Text style={{marginTop:3}}>Man</Text>
            </Block>
            <Block style={{flex:1, flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',}}>
            <Switch
                value={this.state.preferenceWoman}
                onValueChange={value => this.setState({ preferenceWoman: value })}
              />
              <Text style={{marginTop:3}}>Woman</Text>
            </Block>
       </Block>
       
    <Block flex bottom style={{marginTop: 25,}}>
    {this.state.preferenceMan || this.state.preferenceWoman ? <Button
        round
        color={theme.COLORS.WHITE}
        
        onPress={()=> {Actions.Step4({gender:{...this.state.radioButtons[0].checked ? "w":"m"},
                                      date:this.date,
                                      firstName:this.name,
                                      lastName:this.surname,
                                      preferenceMan:this.state.preferenceMan,
                                      preferenceWoman:this.state.preferenceWoman}); /*this._getLocationAsync();
          this.location = _getFetchBackgroundLocationAsync();*/
        }}>
        <Text center color="#E801DA" size={theme.SIZES.FONT * 0.90}>
          {"Next"}
        </Text>
      </Button> : null }
    </Block>
  </Block>
</KeyboardAvoidingView>
    
          </LinearGradient>
        );
      }
    }
    
export default Step3;