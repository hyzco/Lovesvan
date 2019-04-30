import React, { Component } from 'react';
import { View, Button, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import { LoadingIndicator } from '../loadingIndicator/loadingIndicator';
import { logoutUser } from '../../actions/session/actions';
import {_unRegisterAllTasksAsync} from '../../backgroundTask/map/backgroundTasks';
import {LocationDialog} from '../map/function'
import {TaskManager} from 'expo';
import mapsReducer from '../../reducers/maps/mapsReducer';

class Home extends Component {
  logout = () => {
    //_unRegisterAllTasksAsync("background-fetch-location");
    this.props.logout();
    setTimeout(() => {
      
      Actions.reset('login');
    }, 100);
  };

  render() {
    const { container, marginBox, title } = styles;
    const {
      user: { email },
      locationServiceStatus
    } = this.props;
    return (
      <View style={container}>
        <LocationDialog isTrue={locationServiceStatus} />
      
        <View style={marginBox}>
          <Button onPress={this.logout} title="Logout" />
        </View>

        <View>
         {/* <Text style={title}>User: {displayName}</Text>*/}
          <Text style={title}>Email1: {email}</Text>
         {/* <Image source = {{uri:photoURL}}*
   style = {{ width: 200, height: 200 }}
    />*/}
          <Button onPress={Actions.search} title="Go to Search" />
          <Button onPress={Actions.todolist} title="Start To-Do List" />
          <Button onPress={Actions.map} title="Go to Map" />
        </View>

        <View style={marginBox}>
          <Icon name="logo-github" size={40} />
          <Text>@HyzCde</Text>
        </View>
      </View>
      
    );
  }
}

const mapStateToProps = ({ routes, sessionReducer,mapsReducer}) => ({
  routes: routes,
  user: sessionReducer.user,
  locationServiceStatus:mapsReducer.status,
});

const mapDispatchToProps = {
  logout: logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
