import React, { Component } from 'react';
import { 
        View, 
        Button,
        ScrollView, 
        RefreshControl,
        Alert,
        Text,
        TouchableOpacity,
        ListView,
        Image,
        StyleSheet
      } from 'react-native';
import { connect } from 'react-redux';
//import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import firebaseService from '@firebase/app';

//Socket IO 
//import io from 'socket.io-client/dist/socket.io';

import md5 from '../../enviroments/lib/md5';

import { fetchMatches } from '../../actions/session/actions';

class Message extends React.Component {

  constructor(){
    super();
    this.state = {
      refreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    loading: true 
    };
    this.friendsRef
  }


  getRef() {
    return firebaseService.database().ref();
  }

  listMatchItems(matches){
        var chatItems = [];
        matches.map((match,index)=>{
              chatItems.push({
                name : match.Name,
                uid  : match.ID,
                photoURL: match.photoURL,
                email: match.Email,
              });
        });

        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(chatItems),
          loading: false
        });
  }

  fetchData = async()=>{
    const  {
      matches
     }=this.props;
     // socket.emit("sendID",2);
      this._getMatches(this.props.user.uid);  
   
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  _getMatches(uid){
       var Matches = [];
          let data ={
              method: 'POST',
              body: JSON.stringify({
                uid: uid,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
          }
          return fetch('http://ffa1.lovesvan.com/api/get/matches',data)
          .then(response => response.json()) //promise
          .then((json) =>{
            /*
              json.matches.map((matches,i) => {
                console.log(matches.ID);
              })*/
                this.listMatchItems(json.matches);
                this.props.setMatches(json.matches);

          }).catch((error) =>{
              console.log(error);
          });
  }

  componentDidMount(){
    const  {
      user:{displayName,email,photoURL,uid},
      matches
     }=this.props;

     this.listMatchItems(matches);
  }


  renderRow = (rowData) =>{
        return <TouchableOpacity onPress={() => Actions.privateRoom({friend: rowData}) }>
        <View style={styles.profileContainer}>
            <Image source={{ uri: rowData.photoURL }} style={styles.profileImage}/>
            <Text style={styles.profileName}>{rowData.name}</Text>
        </View>
    </TouchableOpacity>
  }

/*
  render() {
    const { pop, counter } = Actions;
    const {matches} = this.props;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
         <View style={styles.container}>  
         {matches.map((matches,i)=>(
                                                      <Text key={i}>{matches.ID}</Text>
                                            ))}
             <Button onPress={pop} title="< Back to Home" />
          </View>
      </ScrollView>
    );
  }
}
*/

render() {
  return (
<ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
      <View style={styles.container}>
      
          <View style={styles.topGroup}>
              <Text style={styles.myFriends}>My Friends</Text>
              <TouchableOpacity>
                  <Text style={styles.inviteFriends}>Invite More Freinds</Text>
              </TouchableOpacity>
          </View>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
          <Spinner visible={this.state.loading} />
      </View>
      </ScrollView>
  );
}
}


const mapStateToProps = ({ routes, counterReducer,sessionReducer }) => ({
  routes: routes,
  matches: sessionReducer.matches,
  user: sessionReducer.user,


});

const mapDispatchToProps = {
  setMatches: fetchMatches,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);



const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      marginRight: 10,
      marginLeft: 10
  },
  rightButton: {
      marginTop: 10,
      marginLeft: 5,
      marginRight: 10,
      padding: 0,
  },
  topGroup: {
      flexDirection: 'row',
      margin: 10
  },
  myFriends: {
      flex: 1,
      color: '#A5A5A5',
      fontSize: 16,
      padding: 5
  },
  inviteFriends: {
      color: '#3A5BB1',
      padding: 5
  },
  profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 6,
      marginBottom: 8,
  },
  profileImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginLeft: 6
  },
  profileName: {
      marginLeft: 6,
      fontSize: 16
  }

})