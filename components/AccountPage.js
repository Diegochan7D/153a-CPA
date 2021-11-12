import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountTemplate from '../components/AccountTemplate'

const AccountPage = ({navigation}) => {
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);
  const [userInformation, setUserInformation] = useState([]);
  const [infoCorrect, setInfoCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  //Check whether the info entered exists in database
  const checkInformation = () => {
    for (let i = 0; i < userInformation.length; i++) {
      if (userId == userInformation[i].userId.toString() && password == userInformation[i].password.toString()) {
        setInfoCorrect(true);
        break;
      }
      setInfoCorrect(false);
    }
  }

  let loginResult = infoCorrect == true?
    <View>
      <Text style = {styles.footer}>Login successful</Text>
      <Button
        title = "Go to Profile"
        color = '#ff8c00'
        onPress = {() =>
          navigation.navigate('Profile')
        }
      />
    </View>
    :
      <Text style = {styles.footer}> Wrong Information </Text>

  let loginResultShow = showResult == true? loginResult : <></>

  return (
    //Container
    <AccountTemplate
      header = {<Text style = {styles.header}> Please sign in </Text>}
      footer =  {loginResultShow}
    >

      <View style = {{flex:4, justifyContent:'center'}}>
        <Text style = {styles.text}> UserId: </Text>
        <TextInput
          placeholder = 'UserId'
          style = {styles.textInput}
          onChangeText = {text => {
            setUserId(text);
          }}
        />
        <Text style = {styles.text}> Password: </Text>
        <TextInput
          placeholder = 'Password'
          style = {styles.textInput}
          onChangeText = {text => {
            setPassword(text);
          }}
        />
      </View>
      <View style = {{flex:2, justifyContent:'center',alignItems:'center'}}>
        <Button
          title = 'Sign in'
          color = '#6495ed'
          onPress = {() => {
            checkInformation()
            setShowResult(true)
          }}
        />
        <Text style = {{fontSize:18,color:'#696969'}}> or </Text>
        <Button
          title = 'Create an Account'
          color = '#6495ed'
          onPress = {() => {
            const newUserInformation =
              userInformation.concat(
                {
                  'userId':userId,
                  'password':password
                }
              )
            setUserInformation(newUserInformation)
            Alert.alert('Account created')
          }}
        />
      </View>

    </AccountTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    flex: 1,
    backgroundColor: '#fff',
    textAlign:'left',
    padding:5,
  },

  header: {
    fontSize: 40,
    color: '#696969',
  },

  footer: {
    fontSize: 20,
    color: `#778899`,
  },

  text: {
    fontSize: 30,
    color: '#696969',
  },

  textInput: {
    height:50,
    margin:10,
    borderWidth:1,
    padding:10
  }

});

export default AccountPage;
