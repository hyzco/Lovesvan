import React, { Component, Fragment} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Constants } from 'expo';
// galio components
import {
  Block, Card, Text, NavBar,Button
} from 'galio-framework';
import theme from './theme';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { ColorPicker,Tag,CheckBox   } from 'react-native-btr';
import {Switch} from '../../../../assets/themeComponents';
import firebaseService from '@firebase/app';


const { width, height } = Dimensions.get('screen');


let genderIcon = null;
let moodIcon = null;
let coinIcon = null; 

class TopPanelOnMap extends Component {
  state = {
    visibleModalId: null,
    selectedColor: this.props.userData.moodColor,
    colors :["#E91E63", "#9C27B0", "#3F51B5", "#2196F3"],
    checked: false,
    userData:this.props.userData,
    preferenceMan: this.props.userData.preferenceGender.man,
    preferenceWoman: this.props.userData.preferenceGender.woman,
    UID : this.props.userID.uid,
    moodState: this.props.userData.moodState,
    svanCoin: this.props.userData.svanCoin,
  };

  componentDidUpdate(){
    genderIcon = <FontAwesome5  name={"venus-mars"} solid size={15} color="#610080" />;
    moodIcon = <FontAwesome5  name={"glass-cheers"} solid size={15} color={this.state.selectedColor} />;
    coinIcon = <FontAwesome5  name={"coins"} size={15} color="#ffd800" />;
  }

  updateGenderPreferences(preference,value){
    var genderPrefRef = firebaseService.database().ref('Users/'+this.state.UID+'/preferenceGender/');
      if(preference == "man"){
        this.setState({ preferenceMan: value })
        genderPrefRef.update({ man : value});
      }else if(preference == "woman"){
        this.setState({ preferenceWoman: value })
        genderPrefRef.update({ woman : value});

      }
  }

  updateMoodState(moodColor,moodState){
    var moodRef = firebaseService.database().ref('Users/'+this.state.UID);
    if(moodColor){
      this.setState({ selectedColor: moodColor })
        moodRef.update({moodColor:moodColor});
    }
     if(moodState){
      this.setState({ moodState: moodState })
        moodRef.update({moodState:moodState});
    }
  }

  genderRenderModal  (){
    const {userData} = this.state;
    return(
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Gender Preference 💕</Text>
      <Text style={styles.contentText}>According to your preferences, we will introduce prospective soul mate candidates. </Text>

      <Block style={{backgroundColor:'#fff',height:100,width:width/3,marginTop: 10,borderRadius: 5}}>
          <Block style={{flex:1, flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',marginTop: 15}}>
            <Switch
                value={this.state.preferenceMan}
                onValueChange={value => this.updateGenderPreferences("man",value)}
              />
              <Text style={{marginTop:3}}>Man  💙 </Text>
            </Block>
            <Block style={{flex:1, flexDirection: 'row',justifyContent: 'flex-start',alignItems: 'flex-start',}}>
            <Switch
                value={this.state.preferenceWoman}
                onValueChange={value => this.updateGenderPreferences("woman",value)}
              />
              <Text style={{marginTop:3}}>Woman ❤️ </Text>
            </Block>
       </Block>
    </View>
    );
  };

  moodRenderModal = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Choose your Mood! 😁</Text>
      <Text style={styles.contentText}>The colors and modes you choose
       will increase the likelihood of matching and confronting the same people as you.
        Now you won't waste time asking about the things that match your hearts! 💓
      Just happiness, maybe your soul mate thinks the same as you.</Text>
      
      <ColorPicker 
          selectedColor={this.state.selectedColor}
          onSelect={selectedColor => this.updateMoodState(selectedColor,false)}
          colors = {this.state.colors}
        />
        <Block style={styles.box}>
        <Tag 
        name='Talk'
        style={{backgroundColor: '#E91E63', color: '#fff', borderRadius: 50, borderWidth: 1}}
       // iconLeft='plus-circle'
       // iconRight='close-circle'
        onPress={()=>this.updateMoodState(false,"Talk")}
      />
       <Tag 
        name='Party'
        style={{backgroundColor: '#9C27B0', color: '#fff', borderRadius: 50, borderWidth: 1}}
       // iconLeft='plus-circle'
      //  iconRight='close-circle'
      onPress={()=>this.updateMoodState(false,"Party")}
      />
        <Tag 
        name='Travel'
        style={{backgroundColor: '#3F51B5', color: '#fff', borderRadius: 50, borderWidth: 1}}
       // iconLeft='plus-circle'
      //  iconRight='close-circle'
      onPress={()=>this.updateMoodState(false,"Travel")}
      />
        <Tag 
        name='Love'
        style={{backgroundColor: '#2196F3', color: '#fff', borderRadius: 50, borderWidth: 1}}
       // iconLeft='plus-circle'
      //  iconRight='close-circle'
      onPress={()=>this.updateMoodState(false,"Love")}
      />

        </Block>

        <Text style={{fontSize:20,marginTop:5}}>{this.state.moodState} 😎</Text>

    </View>
  );

  coinRenderModal = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Coin 👋!</Text>
      <Text style={styles.contentTitle}>BUYYYYYYY 👋!</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Close"
      />
    </View>
  );


      render() {
        return (
          <Block style={styles.container}>      
              <Block style={styles.box}>

                <Button style={[{width:100,height:35},styles.button]} 
                    onPress={() => this.setState({ visibleModal: 'genderModal' })}>
                   <Text style={{color:"#610080",fontWeight:'bold'}}>{genderIcon} Gender</Text>
                </Button>

                  <Button style={[{width:140,height:35},styles.button]} 
                   onPress={() => this.setState({ visibleModal: 'moodModal' })}>
                  <Text style={{color:this.state.selectedColor,fontWeight:'bold'}}>{moodIcon} {this.state.moodState}</Text>
                </Button>

              <Button style={[{width:100,height:35},styles.button]} 
                   onPress={() => this.setState({ visibleModal: 'coinModal' })}>
                   <Text style={{color:"#610080",fontWeight:'bold'}}>{coinIcon} {this.state.svanCoin}</Text>
                </Button>

            </Block>
            
                  <Modal
                      isVisible={this.state.visibleModal === 'genderModal'}
                      onBackdropPress={() => this.setState({visibleModal: null})}
                      onBackButtonPress={()=>this.setState({visibleModal: null})}>
                      {this.genderRenderModal()}
                  </Modal>

                  <Modal
                      isVisible={this.state.visibleModal === 'moodModal'}
                      onBackdropPress={() => this.setState({visibleModal: null})}
                      onBackButtonPress={()=>this.setState({visibleModal: null})}>
                      {this.moodRenderModal()}
                  </Modal>

                  <Modal
                      isVisible={this.state.visibleModal === 'coinModal'}
                      onBackdropPress={() => this.setState({visibleModal: null})}
                      onBackButtonPress={()=>this.setState({visibleModal: null})}>
                      {this.coinRenderModal()}
                  </Modal>

           </Block>
        )
    }
}
    const styles = StyleSheet.create({
    container: {
    //  flex: 1,        
    },
    box:{
      flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
      backgroundColor:theme.COLORS.WHITE,
      borderBottomLeftRadius: 15,
       borderBottomRightRadius: 15,
       borderTopLeftRadius: 15,
       borderTopRightRadius: 15,
       marginHorizontal:15,
    },
    content: {
      backgroundColor: 'white',
      padding: 22,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    contentText:{
      textAlign: 'center', // <-- the magic
      fontSize: 14,
      marginBottom: 12,
    }
  })

  export default TopPanelOnMap;