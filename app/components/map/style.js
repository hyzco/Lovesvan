import { StyleSheet,Dimensions } from 'react-native';
import { Constants} from "expo";
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

export const mapStyle =[
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#FF007B"
          },
          {
              "saturation": 59.80000000000001
          },
          {
              "lightness": 21
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#ff00af"
          },
          {
              "saturation": 32.599999999999994
          },
          {
              "lightness": 20.599999999999994
          },
          {
              "gamma": 1
          },
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "saturation": "40"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#FFAF00"
          },
          {
              "lightness": 50.80000000000001
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#FFE800"
          },
          {
              "lightness": 8.600000000000009
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#FFD900"
          },
          {
              "saturation": 44.79999999999998
          },
          {
              "lightness": 3.6000000000000085
          },
          {
              "gamma": 1
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "hue": "#0078FF"
          },
          {
              "saturation": 24.200000000000003
          },
          {
              "gamma": 1
          }
      ]
  }
]
export const styles = StyleSheet.create({
  container: {
      flex:1,
    //...StyleSheet.absoluteFillObject,
  },
  
  map: {
      ...StyleSheet.absoluteFill
  },
  refreshing: {
    marginBottom: 1
  }
  
});
