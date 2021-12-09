import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import anonymous1 from '../assets/anonymous1.jpg';
import Axios from 'axios'
import ValueProvider,{useValue} from '../components/ValueContext';


const ConfessionsScreen = ({navigation}) => {
  const {currentValue} = useValue();
  //const [title,setTitle] = useState("");

  const [bboard,setBboard] = useState("confessions");

  const [numNewPosts,setNumNewPosts] = useState(0)

  const [pic,setPic] = useState('https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300')
  const [text,setText] = useState("")
  const [posts,setPosts] = useState([])
  //let myDate = new Date();
  const [currentTime, setCurrentTime] = useState(null)

  const getDate = () => {
      setCurrentTime(new Date().toLocaleString())
  }

  useEffect(() => {
    // go out to the server and get the posts for the current bboard

    const getPosts = async () => {
      let result = {data:[]}
      result =
        await Axios.post(
          currentValue.appURL+"/posts",
          {bboard:bboard}
        )
      setPosts(result.data)
      return result.data
    }

    const ps = getPosts()

  },[numNewPosts])


  const addPost = async () =>{

    await Axios.post(currentValue.appURL+"/addComment",
        {email:currentValue.email,
         secret:currentValue.secret,
         bboard:bboard,
         text:text,
       });
    //setTitle("");
    setText("");

    setNumNewPosts(numNewPosts+1)
  }

  const remove = async (item) => {
    console.log('remove is called on item: ')
    console.log(item)
    const result = await Axios.post(currentValue.appURL+"/deletePost",
       {email:currentValue.email,
        secret:currentValue.secret,
        postid:item._id})
    console.log(result)
    setNumNewPosts(numNewPosts+1)
  }

  const renderConfessions = ({ item }) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;

    return (
      <View style = {styles.item}>
        <View style = {{flex:1,flexDirection:'row'}}>
          <Text> {item.numNewPosts} </Text>
          <Image source = {require('../assets/anonymous1.jpg')}
            style = {styles.image}
            />
          <Text> {item.text} </Text>
        </View>
        <View style = {{flex:1,justifyContent:'flex-end', alignItems:'flex-end'}}>
          <Text>{item.createdAt}</Text>
          {isAuthor &&
            <Button
              title="Delete"
              onPress={()=>remove(item)}/> }
        </View>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <FlatList
          data = {posts}
          renderItem = {({item}) => (<renderConfessions item={item}/>)}
          renderItem = {renderConfessions}
          keyExtractor = {(item) => item._id}
        />
      <View style = {{height: 0, borderTopWidth: 1, borderColor: '#ffb6c1'}}>
      </View>
      <TextInput
        style={styles.input1}
        placeholder="Say something......"
        onChangeText={text => {
             setText(text);
           }}
      />
      <Button
         title="Post"
         color="#ffb6c1"
         onPress = {() => addPost()}
       />
       <View>
          <Text> {JSON.stringify(currentValue,null,5)} </Text>
       </View>

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
