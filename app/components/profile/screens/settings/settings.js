import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView, TextInput } from 'react-native'
import Slider from 'react-native-slider';

import { Divider, ButtonCustomize, Block, Text, Switch } from '../../../../../assets/themeComponents';
import { theme, mocks } from '../../../../../assets/themeComponents/constants';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { logoutUser } from '../../../../actions/session/actions';

export class Setting extends React.Component {
  logout = () => {
    //_unRegisterAllTasksAsync("background-fetch-location");
    this.props.logout();
    setTimeout(() => {
      Actions.reset('welcome');
    }, 100);
  };

  state = {
    budget: 850,
    monthly: 1700,
    notifications: true,
    newsletter: false,
    editing: null,
    profile: {},
  }

  componentDidMount(){
    this.setState({ profile: this.props.profile });
  }

  handleEdit(name, text) {
    const { profile } = this.state;
    profile[name] = text;
    this.setState({ profile });
  }

  toggleEdit(name) {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit(name) {
    const { profile, editing } = this.state;
    if (editing === name) {
        return (
          <TextInput
            defaultValue={profile[name]}
            onChangeText={text => this.handleEdit([name], text)}
          />
        )
    }
    return <Text>{profile[name]}</Text>
  }


  render() {
    const { profile, editing } = this.state;
    const { user:{uid,email}, userData } = this.props;
    var age = (new Date().getFullYear())-(userData.dateOfBirth.split("-")[0]);

    return (
      <Block style={{backgroundColor:'#f3f3f3'}}>
        <Block flex={false} row center space="between" style={styles.header}>
        <Block flex={false} column center space="between">
          <Text h2 bold>{userData.name} {userData.surname} {age}</Text>
          <Text h5>Warsaw/Poland </Text>
          </Block>
          <ButtonCustomize onPress={()=>this.logout()}>
            <Image
              source={profile.avatar}
              style={styles.avatar}
            />
          </ButtonCustomize>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text primary style={{ marginBottom: 10 }}>Username</Text>
                {this.renderEdit('username')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('username')}>
                {editing === 'username' ? 'Save' : 'Edit'}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text primary style={{ marginBottom: 10 }}>Location</Text>
                {this.renderEdit('location')}
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('location')}>
                {editing === 'location' ? 'Save' : 'Edit'}
              </Text>
            </Block>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text primary style={{ marginBottom: 10 }}>E-mail</Text>
                <Text >{email}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />
            <Block style={styles.sliders}>
              <Block margin={[10, 0]}>
                <Text primary style={{ marginBottom: 10 }}>Budget</Text>
                  <Slider
                    minimumValue={0}
                    maximumValue={1000}
                    style={{ height: 19 }}
                    thumbStyle={styles.thumb}
                    trackStyle={{ height: 6, borderRadius: 6 }}
                    minimumTrackTintColor={theme.colors.secondary}
                    maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                    value={this.state.budget}
                    onValueChange={value => this.setState({ budget: value })}
                  />
              <Text caption gray right>$1,000</Text>
            </Block>
            <Block margin={[10, 0]}>
              <Text primary style={{ marginBottom: 10 }}>Monthly Cap</Text>
                <Slider
                  minimumValue={0}
                  maximumValue={5000}
                  style={{ height: 19 }}
                  thumbStyle={styles.thumb}
                  trackStyle={{ height: 6, borderRadius: 6 }}
                  minimumTrackTintColor={theme.colors.secondary}
                  maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                  value={this.state.monthly}
                  onValueChange={value => this.setState({ monthly: value })}
                />
              <Text caption gray right>$5,000</Text>
            </Block>
          </Block>

          <Divider />

          <Block style={styles.toggles}>
            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text primary>Notifications</Text>
              <Switch
                value={this.state.notifications}
                onValueChange={value => this.setState({ notifications: value })}
              />
            </Block>
            
            <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text primary>Newsletter</Text>
              <Switch
                value={this.state.newsletter}
                onValueChange={value => this.setState({ newsletter: value })}
              />
            </Block>
          </Block>

        </ScrollView>
      </Block>
    )
  }
}

Setting.defaultProps = {
  profile: mocks.profile,
}

const mapStateToProps = ({ routes, sessionReducer: {user, userData} }) => ({
  routes: routes,
  user: user,
  userData : userData,
  });
  
const mapDispatchToProps = {
logout:logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end'
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  }
})

