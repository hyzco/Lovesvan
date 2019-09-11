import React, { Component } from 'react';
import { 
        View, 
        Button,
        ScrollView, 
        RefreshControl,
        Alert,
        Text,
        TouchableOpacity,
        FlatList,
        Image,
        StyleSheet,
        Dimensions,
        ImageBackground,
        TextInput
      } from 'react-native';
      import {
        Block
      } from 'galio-framework';
import { connect } from 'react-redux';
import { Asset } from 'expo-asset';
//import { styles } from './styles';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import firebaseService from '@firebase/app';
import { theme } from '../../../assets/themeComponents/constants/';

import StoryContainer from '../story';
const { width,height } = Dimensions.get('screen');

//Socket IO 
//import io from 'socket.io-client/dist/socket.io';

import md5 from '../../enviroments/lib/md5';

import { fetchMatches } from '../../actions/session/actions';


function getMatchProfilePic(matchUid){
  return new Promise(resolve =>{
      setTimeout(()=>{
            let data ={
                method: 'POST',
                body: JSON.stringify({
                  _uid: matchUid,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                }
            }
            return fetch('http://ffa1.lovesvan.com/api/user/getUserData',data)
            .then(response => response.json()) //promise
            .then((json2) =>{
                  if(json2.dataUser.profilePic != "null"){
                  resolve("http://ffa1.lovesvan.com/uploads/profilePic/300x300-"+json2.dataUser.profilePic[0]);
                  }else{
                    resolve(null);
                  }
            }).catch((error) =>{
                console.log(error);
            });
      },100)
  })
}

class Message extends React.Component {

  constructor(){
    super();
    this.state = {
      refreshing: false,
      dataSource:[],
    loading: true,
    lastMessage : [],
    WaitingRequestMatch : 0,
    lastRequestProfilePic: null,
    };
  }


  generateChatId(uid,matchid) {
    if(uid > matchid){
        return `${uid}-${matchid}`
    }
    else{
        return `${matchid}-${uid}`
      }
  }

  listMatchItems(matches){
        var chatItems = [];
        matches.map((match,index)=>{
              chatItems.push({
                name : match.Name,
                uid  : match.ID,
                photoURL: match.photoURL,
                email: match.Email,
                LastMessage: match.lastMessage
              });
        });
        this.setState({
          dataSource : chatItems,
          loading: false
        });
  }

  fetchData = async()=>{
    const  {
      matches
     }=this.props;
      await this._getMatches(this.props.user.uid);  
   
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }

  _getMatches = async (uid) =>{
    const matchArr = [];
      let {matches} = this.state; 
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
                      json.matches.map(async (matches,i) => {
                        var profilePicture = await getMatchProfilePic(matches.ID);
                        var Matches = [];
                        let data ={
                            method: 'POST',
                            body: JSON.stringify({
                              uid: uid,
                              muid: matches.ID
                            }),
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            }
                        }
                        return fetch('http://ffa1.lovesvan.com/api/get/lastMessages',data)
                        .then(response => response.json()) //promise
                        .then(async (json2) =>{                          
                          if (json2.lastMessage && json2.lastMessage.length) {
                            json2.lastMessage.map(async (message,i)=>{
                              matchArr.push({
                                Email: matches.Email,
                                ID: matches.ID,
                                Name: matches.Name,
                                lastMessage: message.LastMessage,
                                photoURL: profilePicture,
                              })
                          })
                            }else{
                              matchArr.push({
                                Email: matches.Email,
                                ID: matches.ID,
                                Name: matches.Name,
                                photoURL:profilePicture,
                              })
                            
                            }
                                        
                        this.listMatchItems(matchArr);
                        this.props.setMatches(matchArr);
                        }).catch((error) =>{
                            console.log(error);
                        });
                    })
          }).catch((error) =>{
              console.log(error);
          });
  }

  getWaitingMatchCount(uid){
    const matchArr = [];
    let {matches} = this.state; 
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
        return fetch('http://ffa1.lovesvan.com/api/get/requestMatches',data)
        .then(response => response.json()) //promise
        .then((json) =>{
              json.map(async (value,i)=>{
                  if(i == json.length-1){
                    if(value.countWaitings <=99){
                      this.setState({
                        WaitingRequestMatch: value.countWaitings,
                      })
                    }
                    else{
                      this.setState({
                        WaitingRequestMatch: 99,
                      })
                    }
                  }
                  
                  if(i == json.length-2){
                    this.setState({
                       lastRequestProfilePic: await getMatchProfilePic(value.waitingMatchID),
                    })
                  }

                })
        }).catch((error) =>{
          console.log(error);
      });
  }



  componentDidMount(){
    const  {
      user:{displayName,email,photoURL,uid},
      matches
     }=this.props;
     console.log("WaitingMatches",this.state.WaitingRequestMatch);

     this.getWaitingMatchCount(uid);
     this.listMatchItems(matches);
  }


  renderPremiumStories() {
    return(
      
       <ScrollView
                    horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                   
                 
          {this.state.WaitingRequestMatch > 0 ? (
                   <TouchableOpacity style={{borderWidth: 2,justifyContent: "center",alignItems: "center",borderColor: theme.colors.gold,borderRadius: 50,height: 75,width: 75,marginLeft:5,marginRight:5}}> 
                      <ImageBackground blurRadius={6}  imageStyle={{ borderRadius: 70/2,borderColor:'white',borderWidth:1.5,backgroundColor: 'powderblue'}} style={{width: 70, height: 70}} source={{uri:this.state.lastRequestProfilePic}} >                  
                            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                 <Text style={{color:theme.colors.white, fontSize:25,fontWeight:'bold'}}> +{this.state.WaitingRequestMatch} </Text>
                            </View>
                      </ImageBackground> 
                   </TouchableOpacity>):(null)}
                     <StoryContainer/>

          
    </ScrollView>
   
    )
  }

  renderRow = ({item}) =>{
return <TouchableOpacity activeOpacity={15} onPress={() => Actions.privateRoom({friend: item,title:item.name,picture:item.photoURL}) }>
        <View style={styles.profileContainer}>
            <Image source={{ uri: item.photoURL }} style={styles.profileImage}/>
            <Text style={styles.profileName}>{item.name}</Text>
            <Text style={styles.profileName}>{item.LastMessage}</Text>
        </View>       
    </TouchableOpacity>
  }


render() {
  return (
<ScrollView style={{backgroundColor:"#f3f3f3"}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
    
      <View style={styles.container}>
      <Text style={[styles.myFriends,{fontWeight:'bold',fontSize:16,paddingLeft:10}]}>Your soulmates</Text>
        
           {this.renderPremiumStories()}
          <View style={styles.topGroup}>
              <Text style={styles.myFriends}>Your </Text>
              <TouchableOpacity>
                  <Text style={styles.inviteFriends}>Invite More Freinds</Text>
              </TouchableOpacity>
          </View>
          

 <FlatList
            showsVerticalScrollIndicator={false}
         //   contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={this.state.dataSource}
            renderItem={this.renderRow}
            keyExtractor={(item,index)=>index.toString()}
            onEndReachedThreshold={1}
            initialNumToRender={this.state.dataSource.length}
          />

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
  lastMessages: sessionReducer.lastMessages,

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
      marginLeft: 0,
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
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderColor:theme.colors.primary,
    backgroundColor:'white',
    height:80,
    width:width/1.4,
    marginRight:10,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      marginLeft: 0,
      marginBottom: 8,

     shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  profileImage: {
      width: 50,
      height: 50,
      borderRadius: 15,
      borderColor: '#e5e5e5',
      borderWidth:1.5,
      marginLeft: 6
  },
  profileName: {
      marginLeft: 15,
      fontSize: 16
  }

})