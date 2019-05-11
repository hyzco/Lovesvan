import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
  
} from 'react-native';
import { Constants } from 'expo';
// galio components
import {
  Block, Card, Text, Icon, NavBar,Button
} from 'galio-framework';
import theme from './theme';

import Icons from 'react-native-vector-icons/Ionicons';

import SlidingUpPanel from 'rn-sliding-up-panel';

const { width, height } = Dimensions.get('screen');



class DownSlidingPanel extends Component {
    state={
        isPanelActive:false,
        Icon:"ios-arrow-up",
        panel:null
    }
 
    checkPanelIsActive(){
        if(this.state.isPanelActive==false){
            this._panel.show();
            this.setState({
              
                isPanelActive:true,
                Icon:"ios-arrow-down",
            })
        }
        else{
            this._panel.hide();
            this.setState({
                isPanelActive:false,
                Icon:"ios-arrow-up",
            })
        }
    }

    static defaultProps = {
        draggableRange: {
          top: height / 1.75,
          bottom: 120
        }
      }
    
      _draggedValue = new Animated.Value(120)
    
      render() {
 
        const {top, bottom} = this.props.draggableRange
   
        const draggedValue = this._draggedValue.interpolate({
          inputRange: [bottom, top],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
    
        const transform = [{scale: draggedValue}]
        const {matches} = this.props;

        return (
          <Block style={styles.container}>
       
            <SlidingUpPanel
            friction={3}
              showBackdrop={false}
              allowDragging={false}
              ref={c => (this._panel = c)}
              draggableRange={this.props.draggableRange}
              animatedValue={this._draggedValue}>
          
              <Block center style={styles.panel}>
       
             
                  <TouchableOpacity onPress={() => this.checkPanelIsActive()}>
                        <Block style={styles.arrow}>
                          <Icons name={this.state.Icon} color={theme.COLORS.LOVESVANPURPLE} size={40} />
                       </Block>
                  </TouchableOpacity>
                
               
     <ScrollView>
              <Block top  style={{flex:1,flexDirection: 'row',justifyContent: 'space-between', marginBottom: 0,}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <Image style={{borderColor:theme.COLORS.DRIBBBLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5,marginLeft:3}} source={{uri:'https://media.nngroup.com/media/people/photos/Kathryn_1.jpg.400x400_q95_autocrop_crop_upscale.jpg'}} />
                               
                                <Image style={{borderColor:theme.COLORS.TWITTER,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kim-Flaherty-Headshot.png.400x400_q95_autocrop_crop_upscale.png'}} />
                                <Image style={{borderColor:theme.COLORS.FACEBOOK,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://avatars.letgo.com/images/83/20/45/8b/8320458b422edf6defcfb974e06d67e08f68b909b78f8f2b4aba19f5dccc847b?impolicy=img_110'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPURPLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://pbs.twimg.com/profile_images/543563904568545280/cUvr30UJ.jpeg'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPURPLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kim-Flaherty-Headshot.png.400x400_q95_autocrop_crop_upscale.png'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPURPLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTF3NzpnGK2wOkzeyraQKzP-XoZ5INo9nmXH4mJe-viupBZP4'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPINK,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kathryn_1.jpg.400x400_q95_autocrop_crop_upscale.jpg'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPURPLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kim-Flaherty-Headshot.png.400x400_q95_autocrop_crop_upscale.png'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPINK,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kathryn_1.jpg.400x400_q95_autocrop_crop_upscale.jpg'}} />
                                <Image style={{borderColor:theme.COLORS.LOVESVANPURPLE,borderWidth:2,width: 70, height: 70, backgroundColor: 'powderblue',borderRadius:50,marginRight:5}} source={{uri:'https://media.nngroup.com/media/people/photos/Kim-Flaherty-Headshot.png.400x400_q95_autocrop_crop_upscale.png'}} />

                                </ScrollView>
                                  </Block>
                                    {this.state.isPanelActive ? ( <Block center>
                                        <Text>Matches</Text>

                                            {matches.map((matches,i)=>(
                                                      <Text key={i}>{matches.ID}</Text>
                                            ))}

                                    </Block> ) : (null) }
                                
    
    

            </ScrollView>

              </Block>
           
            </SlidingUpPanel>
           
          </Block>
        )
      }
    


}const styles = StyleSheet.create({
    container: {
    //  flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width,
    },
    panel: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: theme.SIZES.BASE * 2.5,
      borderTopRightRadius: theme.SIZES.BASE * 2.5,
    },

    arrow:{
        top:0,
        width,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
  })

  export default DownSlidingPanel;