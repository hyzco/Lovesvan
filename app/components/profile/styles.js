import {StyleSheet,Dimensions} from 'react-native';
const { width,height } = Dimensions.get('screen');

const COLORS = {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GREY: '#898989',
    THEME: '#B23AFC',
    PRIMARY: '#B23AFC',
    INFO: '#1232FF',
    ERROR: '#FE2472',
    WARNING: '#FF9C09',
    SUCCESS: '#45DF31',
    TRANSPARENT: 'transparent',
    INPUT: '#808080',
    PLACEHOLDER: '#9FA5AA',
    NAVBAR: '#F9F9F9',
    BLOCK: '#808080',
    MUTED: '#9FA5AA',
    NEUTRAL: 'rgba(255,255,255, 0.65)',
    FACEBOOK: '#3B5998',
    TWITTER: '#5BC0DE',
    DRIBBBLE: '#EA4C89',
    ICON: '#000000',
  };

  const SIZES = {
    BASE: 16,
    FONT: 16,
    OPACITY: 0.8,
  };

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.WHITE,
  },
  profileContainer:{
      flex:3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
  },
  tabContainer:{
      flex:1,
      backgroundColor:'blue',
  },
  contentContainer:{
      flex:6,
      backgroundColor:'green',
   
  },
  profileImageContanier:{
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContentContainer:{
    flex:6,
    justifyContent: 'center',
    marginLeft: 25,
  },
  profileImage:{
    borderRadius: 50,
    width:100,
    height:100,
    borderWidth: 2,
    borderColor: COLORS.DRIBBBLE, 
  },
  nameText:{
    fontSize:20,
    color:COLORS.GREY,
  },
  userNameText:{
    fontFamily: 'SpaceMono-Regular',

    fontSize:15,
    fontWeight:'bold',
    color:COLORS.DRIBBBLE,
  }
});


  
  export default {
    COLORS,
    SIZES,
    styles
  };
