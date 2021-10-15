import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {
  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }

  return (
    <View style = {{flex:1, flexDirection:'column',justifyContent:'center', alignItems:'center'}}>
      <Button
         title={"Clear All Data"}
         color="red"
         onPress = {() => {
           clearAll()
           Alert.alert('All data cleared')
         }}
       />
    </View>
  );
}

export default Settings;
