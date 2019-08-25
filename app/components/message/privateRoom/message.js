import React, { Component } from 'react';
import { View, Text,StyleSheet,KeyboardAvoidingView,Platform,TextInput,Dimensions  } from 'react-native';
import { connect } from 'react-redux';
//import { styles } from '../styles';

import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
import firebaseService from '@firebase/app';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import md5 from '../../../enviroments/lib/md5'
import Icons from 'react-native-vector-icons/Ionicons';

const LOVESVANPINK = "#af01b4";
const LIGHT_GRAY = "#D3D3D3";
const { width,height } = Dimensions.get('screen');

//Socket IO 
//import io from 'socket.io-client/dist/socket.io';


import { fetchMatches } from '../../../actions/session/actions';

class PrivateRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        messages: [],
        typingText: "Will update if user is typing...",
        isFocused: false,
        height: 0
    };

    this.user = firebaseService.auth().currentUser
    this.friend = this.props.friend

    this.chatRef = this.getRef().child('chat/' + this.generateChatId());


    this.renderFooter = this.renderFooter.bind(this);
    this.renderInputToolbar = this.renderInputToolbar.bind(this);

    this.chatRefData = this.chatRef.orderByChild('order')
    this.onSend = this.onSend.bind(this);
  }

  generateChatId() {
    if(this.user.uid > this.friend.uid){
        return `${this.user.uid}-${this.friend.uid}`
    }
    else{
        return `${this.friend.uid}-${this.user.uid}`
      }
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
          order: -1 * now,
          isSent: true,
          isRecieved:false,
      })
  }) 
}

renderBubble=(props) => {
  return (
    <Bubble
      {...props}
      textStyle={{
        right: {
          color: 'white',
        },
        left:{
          color:'black'
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
        right:{
          backgroundColor:'#af01b4',
        }
      }}
    />
  );
}

renderSend(props) {
  return (
    <Send {...props}>
      <View style={{ marginBottom: 5, marginRight: 10 }}>
        <Icons
          name="md-send"
          color="#af01b4"
          size={29}
        />
      </View>
    </Send>
  );
}


renderFooter(props) {
  if (this.state.typingText) {
    console.log("typing");
    return (
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          {this.state.typingText}
        </Text>
      </View>
    );
  }
  console.log("no");
  return null;
}

//Footer text input start
handleFocus = event => {
  this.setState({ isFocused: true });
  if (this.props.onFocus) {
    this.props.onFocus(event);
  }
};

handleBlur = event => {
  this.setState({ isFocused: false });
  if (this.props.onBlur) {
    this.props.onBlur(event);
  }
};



renderInputToolbar(props){
  const { isFocused } = this.state;
  const { onFocus, onBlur, ...otherProps } = this.props;
  return (
    <View style={{backgroundColor:'#f3f3f3',flexDirection: 'row',justifyContent: 'space-between',height:60}}>
    <TextInput
      selectionColor={LOVESVANPINK}
      underlineColorAndroid={
        isFocused ? LOVESVANPINK : LIGHT_GRAY
      }
      placeholder="Email"
      onContentSizeChange={(event) => {
        this.setState({
          height: event.nativeEvent.contentSize.height,
        });
      }}
      
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      style={styles.textInput}
      multiline = {true}
      numberOfLines = {4}
      {...otherProps}
    />
    <Send {...props}>
      <View style={{ marginBottom: 5, marginRight: 10 }}>
        <Icons
          name="md-send"
          color="#af01b4"
          size={29}
        />
      </View>
    </Send>
    </View>
  );
}
//Footer text input finish 

render() {
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        textInputProps={{autoFocus: true}}
        alwaysShowSend
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        isAnimated
        loadEarlier
        isLoadingEarlier
   //     renderInputToolbar={this.renderInputToolbar}
        renderFooter={this.renderFooter}
          messages={this.state.messages}
          onSend={this.onSend.bind(this)}
          user={{
              _id: this.user.uid,
          }}
          />
            {Platform.OS==="android" ? <KeyboardAvoidingView behavior={'padding'}  disabled/>:null}
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
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  textInput: {
    height: 40,
    width:width/1.1,
    paddingLeft: 6,
  }
})
