import React, { Component } from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView  } from 'react-native';
import { connect } from 'react-redux';
//import { styles } from '../styles';

import { GiftedChat } from 'react-native-gifted-chat';
import firebaseService from '@firebase/app';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import md5 from '../../../enviroments/lib/md5'

//Socket IO 
//import io from 'socket.io-client/dist/socket.io';


import { fetchMatches } from '../../../actions/session/actions';

class PrivateRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        messages: []
    };

    this.user = firebaseService.auth().currentUser
    this.friend = this.props.friend

    this.chatRef = this.getRef().child('chat/' + this.generateChatId());
    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this);
  }

  generateChatId() {
    if(this.user.uid > this.friend.uid)
        return `${this.user.uid}-${this.friend.uid}`
    else
        return `${this.friend.uid}-${this.user.uid}`
  }

    getRef() {
    return firebaseService.database().ref();
}

listenForItems(chatRef) {
  chatRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
          var avatar = ( child.val().uid == this.user.uid? this.user.photoURL : this.friend.photoURL)
          var name = child.val().uid == this.user.uid? this.user.name: this.friend.name
          items.push({
              _id: child.val().createdAt,
              text: child.val().text,
              createdAt: new Date(child.val().createdAt),
              user: {
                  _id: child.val().uid,
                  avatar: avatar
              }
          });
      });

      this.setState({
          loading: false,
          messages: items
      })


  });
}

componentDidMount() {
  this.listenForItems(this.chatRefData);
}

componentWillUnmount() {
  this.chatRefData.off()
}

onSend(messages = []) {

  // this.setState({
  //     messages: GiftedChat.append(this.state.messages, messages),
  // });
  messages.forEach(message => {
      var now = new Date().getTime()
      this.chatRef.push({
          _id: now,
          text: message.text,
          createdAt: now,
          uid: this.user.uid,
          order: -1 * now
      })
  })
}

render() {
  return (
    <View style={{flex: 1}}>
      <GiftedChat
      textInputProps={{autoFocus: true}}
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          user={{
              _id: this.user.uid,
          }}
          />
             <KeyboardAvoidingView behavior={'padding'}  disabled/>
          </View>
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
)(PrivateRoom);


const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      marginRight: 10,
      marginLeft: 10
  }
})