import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import { Card, Badge, ButtonCustomize, Block, Text } from '../../../assets/themeComponents';
import { theme, mocks } from '../../../assets/themeComponents/constants';

import firebaseService from '@firebase/app';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session/actions';
import { Actions } from 'react-native-router-flux';

const { width,height } = Dimensions.get('screen');


export class Profile extends React.Component {

  logout = () => {
    //_unRegisterAllTasksAsync("background-fetch-location");
    setTimeout(() => {
      firebaseService.auth().signOut().then(function() {
        this.props.logout();
         Actions.reset('welcome');
          }).catch(function(error) {
            // An error happened.
          });

    }, 100);
  };
  
  state = {
    active: 'Badges',
    categories: [],
  }

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    const { categories } = this.props;
    const filtered = categories.filter(
      category => category.tags.includes(tab.toLowerCase())
    );

    this.setState({ active: tab, categories: filtered });
  }

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[
          styles.tab,
          isActive ? styles.active : null
        ]}
      >
        <Text size={16} medium gray={!isActive} primary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { user:{uid},userData } = this.props;
    const { categories } = this.state;
    const tabs = ['Badges', 'Missions', 'Powers'];
    var avatar = "https://cdn.dribbble.com/users/1220170/screenshots/5758802/new_avatar_2x.jpg";
    var age = (new Date().getFullYear())-(userData.dateOfBirth.split("-")[0]);
    console.log("a",userData);
    if(userData.profilePic[0] != "null"){
      avatar = "http://ffa1.lovesvan.com/uploads/profilePic/300x300-"+userData.profilePic;
    }    

    return (
      <Block style={{paddingTop: 15,backgroundColor:'#f3f3f3'}}>
        <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={false} column center space="between">
          <Text h2 bold>{userData.name} {userData.surname} {age}</Text>
          <Text h5>Warsaw/Poland </Text>
          </Block>
          <ButtonCustomize style={{backgroundColor:'transparent'}} onPress={() => Actions.settings()}>
            <Image
              source={{uri:avatar}}
              style={styles.avatar}
            />
          </ButtonCustomize>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Explore', { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                  <Text medium height={20}>{category.name}</Text>
                  <Text gray caption>{category.count} products</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

Profile.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}
const mapStateToProps = ({ routes, sessionReducer: {user,userData} }) => ({
  routes: routes,
  user: user,
  userData : userData,

});

const mapDispatchToProps = {
  logout: logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 4.4,
    width: theme.sizes.base * 4.4,
    borderRadius: 50,
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 3,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5,
  },
  category: {
    // this should be dynamic based on screen width
    minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
    maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
  }
})
