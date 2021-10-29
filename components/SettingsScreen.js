import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import anonymous1 from '../assets/anonymous1.jpg';
import anonymous2 from '../assets/anonymous2.png';

const Settings = ({navigation}) => {

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
          setSelectedImage(null)
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }

  const [selectedImage, setSelectedImage] = React.useState(null);
  let sharedImage = selectedImage == null ? <></>:<Image
                      source={{ uri: selectedImage.localUri }}
                      style = {{width: 80, height: 80}}
                    />

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style = {styles.container}>

      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>

        <View style = {{flex: 1}}>
          <Button
             title={"Set Your Photo"}
             color="blue"
             onPress = {() => {
               openImagePickerAsync()
             }}
           />

          <Button
             title={"Clear All Data"}
             color="red"
             onPress = {() => {
               clearAll()
               Alert.alert('All data cleared')
             }}
           />
        </View>

      </View>
    );
  }


  return (
    <View style = {styles.container}>

      <View style = {styles.container}>
        <Image source = {require('../assets/anonymous1.jpg')}
        style={styles.thumbnail}
        />

      </View>

      <View style = {{flex: 1}}>
        <Button
           title={"Set Your Photo"}
           color="blue"
           onPress = {() => {
             openImagePickerAsync()
           }}
         />

        <Button
           title={"Clear All Data"}
           color="red"
           onPress = {() => {
             clearAll()
             Alert.alert('All data cleared')
           }}
         />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:20

  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 1
  },
});
export default Settings;
