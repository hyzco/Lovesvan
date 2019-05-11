import { StyleSheet } from 'react-native';
import { theme } from '../../../assets/themeComponents/constants';

export const styles = StyleSheet.create({
  navBar: {
    height: theme.sizes.base * 4,
    backgroundColor: '#f3f3f3', // or 'white
    borderBottomColor: "transparent",
    elevation: 0, // for android
  },
  barButtonTextStyle: {
    fontSize: 18,
  }
});
