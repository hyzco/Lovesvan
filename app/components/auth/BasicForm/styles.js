import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  textInput: {
    backgroundColor: '#ffffff',
    padding: 10,
    height: 40,
    margin: 10,
    borderRadius: 5
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    margin: 10,
    borderRadius: 5,
    padding: 3,
    backgroundColor: '#88cc88'
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginBox: {
    margin: 10
  },
  imageBox: {
    alignItems: 'center',
    marginTop: 20
  },
  image: {
    width: 120,
    height: 120
  },
  scrollView: {
    backgroundColor: '#2299ec'
  },
  textDisable: {
    fontSize: 20,
  },
  textSuccess: {
    fontSize: 20,
    color: 'green',
  },
});

export const COLORS = {
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

export const SIZES = {
  BASE: 16,
  FONT: 16,
  OPACITY: 0.8,
};
