import React from 'react';
import {
  ScrollView, StyleSheet, Dimensions, Platform,FlatList,Text,View,ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo';

// Galio components
import {
  Card, Block, NavBar,
} from 'galio-framework';
import theme from './theme';
import { SliderBox } from 'react-native-image-slider-box';

const { width } = Dimensions.get('screen');





const cards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    full: true,
    premiumYes: false,

  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes:true,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes:true,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490049350474-498de43bc885?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    location: 'Los Angeles, CA',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes:true,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1493612216891-65cbf3b5c420?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumYes: false,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 16,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 17,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 18,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 19,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
  {
    id: 20,
    image: 'https://images.unsplash.com/photo-1506321806993-0e39f809ae59?&w=300&h=300&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago',
    full: true,
    premiumCircle : "#FFD700",
    premiumYes: true,
  },
];

export default class FetchFeed extends React.Component {
    constructor(props) {
     super(props);
        this.state = {
          data:[],
          page:1,
          isLoading : false,
    };
  }

  componentDidMount(){
    this.setState({
      isLoading:true},
      this.getData
    )
  }

  getData = async ()=>{
    const url = 'https://randomuser.me/api/?seed=$'+Math.random()+'&page='+this.state.page+'&results=10';
    fetch(url).then((response) => response.json())
    .then((responseJson)=>{
        this.setState({
            data:this.state.data.concat(responseJson.results),
            isLoading:false
        })
    })
  }

  renderRow = ({item}) =>{
        return(
         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                <Card
                  key={`card-${item.id.value}`}
                  flex
                  borderless
                  shadowColor={theme.COLORS.BLACK}
                  title={`${item.name.first} ${item.name.last}`}
                  caption ={`Age: ${item.dob.age}`}
                  location={`${item.location.city} / ${item.location.state}`}
                  avatar={item.picture.thumbnail}
                  style={styles.cardName}
                  premiumCircle= {"#FFD700" ? "#FFD700" : "transparent"}
                  premiumYes = {true}
                >
                </Card>
          </View>

        )
  }

  handleLoadMore =()=>{
    this.setState(
      {page:this.state.page+1,isLoading:true},
      this.getData
    )
 }

  renderFooter = () =>{
    return(
      this.state.isLoading ?
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View> : null
    )
  }


  render() {
    const { navigation } = this.props;
    return (
          <FlatList
            showsVerticalScrollIndicator={false}
         //   contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            data={this.state.data}
            renderItem={this.renderRow}
            keyExtractor={(item,index)=>index.toString()}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={10}
            ListFooterComponent={this.renderFooter}
            initialNumToRender={this.state.data.length}
          />
    );
  }
}

const styles = StyleSheet.create({
  loader:{
    marginTop:10,
    alignItems:'center',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
  cardName:{
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
    elevation: theme.SIZES.BASE / 2,
    justifyContent: 'center',
  },
});
