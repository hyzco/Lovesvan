import React, { Component } from "react";
import { View, FlatList } from "react-native";
// Components
import  StoryListItem  from "../../storyListItem/view/storyListItemView";
import styles from "./storyListStyles";

class StoryListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Component Life Cycles
/*

  <Block top  style={{marginTop: 10,flex:1,flexDirection: 'row',justifyContent: 'space-between', marginBottom: 0}}>       
                 
          {this.state.WaitingRequestMatch > 0 ? (
                   <TouchableOpacity style={{borderWidth: 2,justifyContent: "center",alignItems: "center",borderColor: theme.colors.gold,borderRadius: 50,height: 75,width: 75,marginLeft:5,marginRight:5}}> 
                      <ImageBackground blurRadius={6}  imageStyle={{ borderRadius: 70/2,borderColor:'white',borderWidth:1.5,backgroundColor: 'powderblue'}} style={{width: 70, height: 70}} source={{uri:this.state.lastRequestProfilePic}} >                  
                            <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                 <Text style={{color:theme.colors.white, fontSize:25,fontWeight:'bold'}}> +{this.state.WaitingRequestMatch} </Text>
                            </View>
                      </ImageBackground> 
                   </TouchableOpacity>):(null)}
                      
                      <TouchableOpacity style={{borderWidth: 2,justifyContent: "center",alignItems: "center",borderColor: theme.colors.gold,borderRadius: 50,height: 75,width: 75,marginLeft:5,borderStyle:'dashed',marginRight:5}}> 
                      <Image style={{borderColor:'white',borderWidth:1.5,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50}} source={{uri:'https://media.nngroup.com/media/people/photos/Kathryn_1.jpg.400x400_q95_autocrop_crop_upscale.jpg'}} /> 
                      </TouchableOpacity>


*/
  // Component Functions


  render() {
    const {
      stories,
      handleStoryItemPress,
      unPressedBorderColor,
      pressedBorderColor
    } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item,index)=>index.toString()}
          data={stories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <StoryListItem
              handleStoryItemPress={() =>
                handleStoryItemPress && handleStoryItemPress(item, index)
              }
              unPressedBorderColor={unPressedBorderColor}
              pressedBorderColor={pressedBorderColor}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}

export default StoryListView;
