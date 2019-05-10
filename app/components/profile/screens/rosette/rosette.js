import React from 'react';
import {View} from 'react-native';


import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';




export class Rosette extends React.Component {
  render() {

    return (
                <View>
                </View>
    );
  }
}

const mapStateToProps = ({ routes, counterReducer }) => ({
    routes: routes,
  
  });
  
const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rosette);
