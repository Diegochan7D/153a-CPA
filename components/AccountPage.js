import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList,Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountTemplate from '../components/AccountTemplate'
import Axios from 'axios'

import ValueProvider,{useValue} from '../components/ValueContext';

const AccountPage = ({navigation}) => {
  const {currentValue,setCurrentValue} = useValue()
  const [debugging,setDebugging] = useState(true)
  const [email,setEmail] = useState("")
  const [secret,setSecret] = useState("")
  const [checkedRegistration, setCheckedRegistration] = useState(false)

  useEffect(() => { getUserData()}, [])

  const registerEmail = async (email, secret) => {
      try{
          let appURL = currentValue.appURL
          let result = await Axios.post(appURL+'/register',{email:email, secret:secret})
          //let secret = result.data.secret
          let userid = result.data.userid

          await AsyncStorage.setItem(
            '@userData',
            JSON.stringify({...currentValue,email,secret,userid}))
            setEmail(email)
            setSecret(secret)
            setCurrentValue({...currentValue, email,secret,userid})
        }catch(e){
          console.log('error'+e)
          console.dir(e)
        }
    }

    const getUserData = async () => {
      let email = currentValue.email
      let secret = currentValue.secret
      const appURL = currentValue.appURL
      // this function gets the userKey from asyncStorage if it is there
      // if not, it goes to the appURL to get a userKey which it stores in asyncStorage
       try {
         console.log('in getUserData')
         let jsonValue = await AsyncStorage.getItem('@userData')
         //jsonValue=null
         console.log('jsonValue = '+jsonValue)

         let userData = null
         if (jsonValue!=null) {
           userData = JSON.parse(jsonValue)
           let newData =
            {appURL:currentValue.appURL,
              email:userData.email,
              userid:userData.userid,
              secret:userData.secret}
           setCurrentValue(newData)
           setEmail(userData.email)
           setCheckedRegistration(true)

         } else {
              console.log('else clause of Registration')
              setCheckedRegistration(true)
              console.log('no async, set checked to true')
         }
       } catch(e) {
         console.dir(e)
       }
    }

  let ui = <Text>nodebug</Text>
  if (debugging) {
    ui = (
      <View>
        <Text>
            currentValue={JSON.stringify(currentValue,null,5)}
        </Text>
      </View>
    )
  }

  return (
    //Container
    <AccountTemplate
      header = {<Text style = {styles.header}> Please sign in </Text>}
      footer = {<Text style = {styles.header}> Footer </Text>}
    >

      <View style = {{flex:4, justifyContent:'center'}}>
        <Text style = {styles.text}> UserId: </Text>
        <TextInput
          placeholder = ' Email'
          style = {styles.textInput}
          value={email}
          onChangeText = {text => {
            setEmail(text)
          }}
        />
        <Text style = {styles.text}> Password: </Text>
        <TextInput
          placeholder = 'Password'
          style = {styles.textInput}
          value={secret}
          onChangeText = {text => {
            setSecret(text)
          }}
        />
      </View>
      <View style = {{flex:2, justifyContent:'center',alignItems:'center'}}>
        <Button
          title = 'Sign in'
          color = '#6495ed'

        />
        <Text style = {{fontSize:18,color:'#696969'}}> or </Text>
        <Button
          title = 'Create an Account'
          color = '#6495ed'
          onPress = {() => {
            Alert.alert('Account created')
            registerEmail(email)
          }}
        />
      </View>
      {ui}

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
