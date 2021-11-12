import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import anonymous1 from '../assets/anonymous1.jpg';


const ConfessionsScreen = ({navigation}) => {
  const [id,setId] = useState(1)
  const [pic,setPic] = useState('https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300')
  const [comment,setComment] = useState("")
  const [confessions,setConfessions] = useState([])
  let myDate = new Date();
  const [currentTime, setCurrentTime] = useState(myDate.toLocaleString())


   useEffect(() => {getData()}
           ,[])


  const getData = async () => {
       try {
         // the '@profile_info' can be any string
         const jsonValue = await AsyncStorage.getItem('@confessions')
         let data = null
         if (jsonValue!=null) {
           data = JSON.parse(jsonValue)
           setConfessions(data)
           setId(data.length + 1)
           console.log('just set Info')
         } else {
           console.log('just read a null value from Storage')
           // this happens the first time the app is loaded
           // as there is nothing in storage...
           setConfessions([])
           //setPic('https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300')
           setComment("")
           setId(1)

         }
       } catch(e) {
         console.log("error in getData ")
         // this shouldn't happen, but its good practice
         // to check for errors!
         console.dir(e)
         // error reading value
       }
  }

  const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@confessions', jsonValue)
        console.log('just stored '+jsonValue)
      } catch (e) {
        console.log("error in storeData ")
        console.dir(e)
        // saving error
      }
  }


  const renderConfessions = ({ item }) => {
    return (
      <View style = {styles.item}>
        <View style = {{flex:1,flexDirection:'row'}}>
          <Text> {item.id} </Text>
          <Image source = {require('../assets/anonymous1.jpg')}
            style = {styles.image}
            />
          <Text> {item.comment} </Text>
        </View>
        <View style = {{flex:1,justifyContent:'flex-end', alignItems:'flex-end'}}>
          <Text>{item.currentTime}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <FlatList
          data = {confessions}
          renderItem = {renderConfessions}
        />
      <View style = {{height: 0, borderTopWidth: 1, borderColor: '#ffb6c1'}}>
      </View>
      <TextInput
        style={styles.input1}
        placeholder="Say something......"
        onChangeText={text => {
             setComment(text);
           }}
        value = {comment}
      />

      <Button
         title={"Post"}
         color="#ffb6c1"
         onPress = {() => {
           setCurrentTime(myDate.toLocaleString())
           setId(id+1)
           const newConfessions =
             confessions.concat(
               {
                'id':id,
                'pic':pic,
                'comment':comment,
                'currentTime':currentTime
             })
           setConfessions(newConfessions)
           storeData(newConfessions)
           setComment("")
         }}
       />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection : 'column',
    flex: 1,
    backgroundColor: '#fff',

    textAlign:'left',
    marginTop:20,
    padding:20,
  },

  header: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },

  text: {
    fontSize: 30,
    color: 'black',
  },

  item: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1
  },

  input1: {
    height: 80,
    margin: 10,
    borderWidth: 1,
    padding: 8,
  },

  input2: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 8,
  },

  button: {
    margin: 12,
    justifyContent: 'center',
  },

  thumbnail: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderColor: 'black',
    borderWidth: 1
  },

  image: {
    width: 80,
    height: 80,
    borderColor: 'black',
    borderWidth: 1,
  },

});

export default ConfessionsScreen;
