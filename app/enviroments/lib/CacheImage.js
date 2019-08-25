import React from 'react';
import { Image } from 'react-native';
import shorthash from 'shorthash';
import * as FileSystem  from 'expo-file-system';



 export default async function CacheImage(uri){
    const name = shorthash.unique(uri);
    const path = `${FileSystem.cacheDirectory}${name}`;
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
        return image.uri;
     
    }else{

    const newImage = await FileSystem.downloadAsync(uri, path);
        return newImage.uri;
    }
  };

