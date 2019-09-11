import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

// Constants
import DEFAULT_AVATAR from "../../../assets/avatars/no_avatar.png";

// Components
import styles from "./storyListItemStyles";

class StoryListItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  // Component Life Cycles

  // Component Functions
  _handleItemPress = item => {
    const { handleStoryItemPress } = this.props;

    if (handleStoryItemPress) handleStoryItemPress(item);

    this.setState({ isPressed: true });
  };





  render() {
    const { item, unPressedBorderColor, pressedBorderColor } = this.props;
    const { isPressed } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._handleItemPress(item)}
          style= {{borderWidth: 2,justifyContent: "center",alignItems: "center",borderColor: "pink",borderRadius: 50,height: 75,width: 75,marginLeft:5,borderStyle:'dashed',marginRight:5}}
        >
          <Image
            style={{borderColor:'white',borderWidth:1.5,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50}}
            source={item.avatar}
            defaultSource={DEFAULT_AVATAR}
          />
        </TouchableOpacity>
      <Text style={styles.itemText}>{item.user}</Text>
      </View>
    );
  }
}

export default StoryListItemView;
