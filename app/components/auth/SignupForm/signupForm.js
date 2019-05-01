import React, { Component } from 'react';
import { Location, Permissions,LinearGradient} from "expo";
//Theme
import {Alert, Dimensions, KeyboardAvoidingView, Platform,Image} from 'react-native';
import {Block, Button, Input, NavBar, Text, Card} from 'galio-framework';
import theme from './styleRegister';
import { LoadingIndicator } from '../../loadingIndicator/loadingIndicator';
//React-Redux | roture flux
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
//Function
import {_getFetchBackgroundLocationAsync} from '../../../backgroundTask/map/backgroundTasks';
//Actions
import { signupUser } from '../../../actions/session/actions';
import { setCurrentLocation } from '../../../actions/maps/actions';



const { height, width } = Dimensions.get('window');

class LoginFormComponent extends Component {
    constructor(props){
      super(props);
      this.state ={
        errorMessage : null,
        location:{},
        geoInfo:{},
        email: '',
        password: '',
        }
    }
    componentDidMount(){
      this._geoInfo();
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.registered) 
      {
        this._getLocationAsync();
        Actions.reset('home');
      } 
    }
  
    _getLocationAsync = async ()=>{
      let { status } =  await Permissions.askAsync(Permissions.LOCATION);
    
      if (status !== 'granted') {
        this.errorMessage = 'Permission to access location was denied';
      }else{
        console.log("ok");
      }
   
      let location =  await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      })
      .then((location)=>{
        this.location = ( JSON.stringify(location), location);
      })
     
      if(this.location||this.props.registered){
      this.props.setCurrent(this.location,this.state.geoInfo);
      }
    }
  
    _geoInfo(){
      return fetch('https://ipapi.co/json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.state.geoInfo=responseJson;
        }).catch((error) => {
            console.error(error);
        });
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
                    style={{width: width/4.5, height: height/4.5,resizeMode:'contain'}}
                    source={require('../../../../assets/images/lovesvanlogo.png')}/>
            </Block>

 {loading ? (<LoadingIndicator color="#ffffff" size="large" />) : (null)}

  <Block flex={2} middle space="evenly" style={{marginTop: theme.SIZES.BASE * 1}}>
      <Input
        rounded
        type="email-address"
        placeholder="Email"
        autoCapitalize="none"
        bgColor="rgba(255, 255, 255, 0.2)"
        placeholderTextColor = {theme.COLORS.WHITE}
        color={theme.COLORS.WHITE}
        style={{ width: width * 0.9 , borderColor: theme.COLORS.WHITE}}
        onChangeText={text => this.handleChange('email', text)}
      />
      <Input
        rounded
        password
        viewPass
        placeholder="Password"
        bgColor="rgba(255, 255, 255, 0.2)"
        color={theme.COLORS.WHITE}
        placeholderTextColor = {theme.COLORS.WHITE}
        iconColor = {theme.COLORS.WHITE}
        style={{ width: width * 0.9 , borderColor: theme.COLORS.WHITE}}
        onChangeText={text => this.handleChange('password', text)}
      />

    <Block flex bottom>
      <Button
        round
        color={theme.COLORS.WHITE}
        
        onPress={()=> {this.props.signup(email,password); this._getLocationAsync();
          this.location = _getFetchBackgroundLocationAsync();
        }}>
        <Text center color="#E801DA" size={theme.SIZES.FONT * 0.90}>
          {"Register"}
        </Text>
      </Button>
      <Button color="transparent" shadowless onPress={Actions.login}>
        <Text center color={theme.COLORS.WHITE} size={theme.SIZES.FONT * 0.75}>
          {"Already have an account? Login"}
        </Text>
      </Button>
    </Block>

    
  </Block>
</KeyboardAvoidingView>
    
          </LinearGradient>
        );
      }
    }
    



    const mapStateToProps = ({ routes, sessionReducer: { restoring, loading, user, error, logged } }) => ({
      routes: routes,
      restoring: restoring,
      loading: loading,
      user: user,
      error: error,
      logged: logged
    });

  const mapDispatchToProps = {
    signup: signupUser,
    setCurrent:setCurrentLocation,
    };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);

