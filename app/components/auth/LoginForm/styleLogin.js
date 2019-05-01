import {StyleSheet} from 'react-native';
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
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: SIZES.BASE * 0.3,
    paddingHorizontal: SIZES.BASE,
  },
  social: {
    width: SIZES.BASE * 3.5,
    height: SIZES.BASE * 3.5,
    borderRadius: SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  linearGradient:{
    flex:1,
    justifyContent: 'center'
  },
  blockMain:{
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: SIZES.BASE * 3
  }
});


  
  export default {
    COLORS,
    SIZES,
    styles
  };
