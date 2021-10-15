import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MoodsScreen = ({navigation}) => {
    const [id,setId] = useState(1)
    const [pic,setPic] = useState("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
    const [comment,setComment] = useState("")
    const [moods,setMoods]= useState([])
    let myDate = new Date();
    const [currentTime, setCurrentTime] = useState(myDate.toLocaleString())

    useEffect(() => {getData()}
             ,[])

    const getData = async () => {
         try {
           // the '@profile_info' can be any string
           const jsonValue = await AsyncStorage.getItem('@moods')
           let data = null
           if (jsonValue!=null) {
             data = JSON.parse(jsonValue)
             setMoods(data)
             setId(data.length + 1)
             console.log('just set Info')
           } else {
             console.log('just read a null value from Storage')
             // this happens the first time the app is loaded
             // as there is nothing in storage...
             setMoods([])
             setPic("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
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
          await AsyncStorage.setItem('@moods', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
    }


    const renderMoods = ({ item }) => {
      return (

        <View style = {styles.item}>
          <View style = {{flex:1,flexDirection:'row'}}>
            <Text> {item.id} </Text>
            <Image source = {item.pic}
              style = {{width: 80,
                      height: 80}}/>
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
            data = {moods}
            renderItem = {renderMoods}
          />
        <View style = {{height: 0, borderTopWidth: 1, borderColor: '#add8e6'}}>
        </View>
        <TextInput
          style={styles.input1}
          placeholder="Say something......"
          onChangeText={text => {
               setComment(text);
             }}
          value = {comment}
        />

        <TextInput
          style={styles.input2}
          placeholder="Choose a picture(url) for yourself"
          onChangeText={text => {
               setPic(text);
             }}
        />

        <Button
           title={"Post"}
           color="#add8e6"
           onPress = {() => {
             setCurrentTime(myDate.toLocaleString( ))
             setId(id+1)
             const newMoods =
               moods.concat(
                 {
                  'id':id,
                  'pic':pic,
                  'comment':comment,
                  'currentTime':currentTime
               })
             setMoods(newMoods)
             storeData(newMoods)
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
});

export default MoodsScreen;
