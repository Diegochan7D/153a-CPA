import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import PhotoId from '../components/PhotoId'
import AccountTemplate from '../components/AccountTemplate'
import AccountPage from '../components/AccountPage'

const ProfilePage = ({navigation}) => {

  return (
    <AccountTemplate
      header = {<Text style = {styles.header}> Welcome {AccountPage.userId} </Text>}
      
    >
      <View style = {styles.container}>
        <PhotoId/>

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
