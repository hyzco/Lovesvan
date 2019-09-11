import React, { Component } from "react";
import { View,TextInput,Text} from "react-native";
import Story from './components/story/view/storyView';
// Components
const stories = [
    {
      key:1,
      id: "4",
      source: {uri: 'https://source.unsplash.com/1100x900/?girl'},
      user: "Ugur Erdal",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?girl'},
    },
    {
      key:2,
      id: "2",
      source: {uri: 'https://source.unsplash.com/1100x900/?boy'},
      user: "Mustafa",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?boy'},
    },
    {
      key:3,
      id: "5",
      source: {uri: 'https://source.unsplash.com/random'},
      user: "Emre Yilmaz",
      avatar: {uri: 'https://source.unsplash.com/random'},
    },
    {
      key:4,
      id: "3",
      source: {uri: 'https://source.unsplash.com/1100x900/?car'},
      user: "Cenk Gun",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?car'},
    },
    {
      key:4,
      id: "31",
      source: {uri: 'https://source.unsplash.com/1100x900/?car'},
      user: "Cenk Gun",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?car'},
    },
    {
      key:4,
      id: "35",
      source: {uri: 'https://source.unsplash.com/1100x900/?car'},
      user: "Cenk Gun",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?car'},
    },
    {
      key:4,
      id: "12",
      source: {uri: 'https://source.unsplash.com/1100x900/?car'},
      user: "Cenk Gun",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?car'},
    },
    {
      key:4,
      id: "314",
      source: {uri: 'https://source.unsplash.com/1100x900/?car'},
      user: "Cenk Gun",
      avatar: {uri: 'https://source.unsplash.com/1100x900/?car'},
    },
  ];
  

  export default class StoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    render() {
        return (
                     <Story
                        unPressedBorderColor="#e95950"
                        pressedBorderColor="#ebebeb"
                        stories={stories}         
                      />

        )
    }
}


