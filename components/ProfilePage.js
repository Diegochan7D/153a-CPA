import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import PhotoId from '../components/PhotoId'
import AccountTemplate from '../components/AccountTemplate'
import AccountPage from '../components/AccountPage'

const ProfilePage = ({navigation}) => {

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

  return (
    <AccountTemplate
      header = {<Text style = {styles.header}> Welcome {AccountPage.userId} </Text>}
      footer =  <Text> footer </Text>
    >
      <View style = {styles.container}>
        <PhotoId/>

        <View style = {{justifyContent:'center', alignItems:'center'}}>
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

    </AccountTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding:20
  },

  header: {
    fontSize: 40,
    color: '#696969',
  },

  footer: {
    fontSize: 20,
    color: `#778899`,
  },

});
export default ProfilePage;
