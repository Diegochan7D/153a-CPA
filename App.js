import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = "Home"
          component = {HomeScreen}
        />
        <Stack.Screen
          name = "About"
          component = {AboutScreen}
        />
        <Stack.Screen
          name = "Confessions"
          component = {ConfessionsScreen}
        />
        <Stack.Screen
          name = "Moods"
          component = {MoodsScreen}
        />
        <Stack.Screen
          name = "Complaints"
          component = {ComplaintsScreen}
        />
        <Stack.Screen
          name = "Gossips"
          component = {GossipsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/*header*/}
      <View style = {{flex: 2,backgroundColor: '#808080', justifyContent: 'center'}}>
        <Text style = {styles.header}>
          Brandeis Anonymous Forum</Text>
      </View>

      {/*blank line*/}
      <View style = {{flex: 1, backgroundColor: 'white', alignItems: 'flex-start'}}>
        <Text style = {{fontSize: 20}}> Speak freely here as an anonymous......</Text>
        <Button
          title = "About this forum"
          color = '#808080'
          onPress={() =>
            navigation.navigate('About')
          }
        />

      </View>

      <View style = {{flexDirection: 'row', flex: 4}}>
        {/*Confessions*/}
        <View style = {{flex: 1,backgroundColor: '#ffb6c1', justifyContent: 'center', alignItems: 'center'}}>

        <Button
          title = "Confessions"
          color = '#ffb6c1'
          onPress={() =>
            navigation.navigate('Confessions')
          }
          />
        </View>

        {/*Moods*/}
        <View style = {{flex: 1,backgroundColor: '#add8e6', justifyContent: 'center', alignItems: 'center'}}>

          <Button
            title = "Moods"
            color = '#add8e6'
            onPress={() =>
              navigation.navigate('Moods')
            }
            />
        </View>
      </View>

      <View style = {{flexDirection: 'row', flex: 4}}>
        {/*Complaints*/}
        <View style = {{flex: 1,backgroundColor: '#c0c0c0', justifyContent: 'center', alignItems: 'center'}}>
          <Button
            title = "Complaints"
            color = '#c0c0c0'
            onPress={() =>
              navigation.navigate('Complaints')
            }
            />
        </View>

        {/*Gossips*/}
        <View style = {{flex: 1,backgroundColor: '#dda0dd', justifyContent: 'center', alignItems: 'center'}}>

          <Button
            title = "Gossip"
            color = '#dda0dd'
            onPress={() =>
              navigation.navigate('Gossips')
            }
            />

        </View>
      </View>

    </View>
  );
}

const AboutScreen = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Text style = {{fontSize: 30, fontWeight: 'bold'}}> This is an anonymous forum for Brandeis students.
          There are four main branches. </Text>
        <Text style = {{fontSize: 20}}>·The Confessions branch provides
          a place for students to confess their love to someone they
          do not dare speak in person. </Text>
        <Text style = {{fontSize: 20}}>·The Moods branch encourages students
          to share their current mood and the reason behind it. </Text>
        <Text style = {{fontSize: 20}}>·The Complaints branch allows students to release their negative thoughts and seek
          resonance.</Text>
        <Text style = {{fontSize: 20}}>·The Gossip branch is a happy place to talk about interesting
          news.</Text>
        <Button
          title = "Home"
          color = '#808080'
          onPress={() =>
            navigation.navigate('Home')
          }
        />
      </View>
    </View>
  );
}

const ConfessionsScreen = ({navigation}) => {
  const [id,setId] = useState(1)
  const [pic,setPic] = useState("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
  const [comment,setComment] = useState("")
  const [confessions,setConfessions]= useState([])
  const pic1 = 'http://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/zhidao/pic/item/79f0f736afc379310ef054f0e5c4b74542a9114a.jpg';
  const pic2 = 'https://img.88icon.com/download/jpg/20200717/e7a5cbd5c2ae6d23ac572616b08cb95e_512_512.jpg!88bg';
  const pic3 = 'https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300'
  const VII = 'https://media-exp1.licdn.com/dms/image/C4E0BAQHO1gWqXmmqTA/company-logo_200_200/0/1560002759996?e=2159024400&v=beta&t=x69ceEOvO92a9RGh-iaC_cgW2a64JGd3RmRY74G9owM'

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
           console.log('just set Info')
         } else {
           console.log('just read a null value from Storage')
           // this happens the first time the app is loaded
           // as there is nothing in storage...
           setConfessions([])
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
        await AsyncStorage.setItem('@confessions', jsonValue)
        console.log('just stored '+jsonValue)
      } catch (e) {
        console.log("error in storeData ")
        console.dir(e)
        // saving error
      }
  }

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

  const renderConfessions = ({ item }) => {
    return (

      <View style = {styles.item}>
          <Text> {item.id} </Text>
          <Image source = {item.pic}
            style = {{width: 80,
                    height: 80}}/>
          <Text> {item.comment} </Text>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <FlatList
          data = {confessions}
          renderItem = {renderConfessions}
        />

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
         color="#808080"
         onPress = {() => {
           setId(id+1)
           const newConfessions =
             confessions.concat(
               {
                'id':id,
                'pic':pic,
                'comment':comment,

             })
           setConfessions(newConfessions)
           storeData(newConfessions)
           setComment("")

         }}
       />

       <Button
          title={"Clear"}
          color="red"
          onPress = {() => {
            clearAll()
            setConfessions([])
            setId(1)
          }}
        />

    </View>
  );
}

const MoodsScreen = ({navigation}) => {
    const [id,setId] = useState(1)
    const [pic,setPic] = useState("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
    const [comment,setComment] = useState("")
    const [moods,setMoods]= useState([])
    const pic1 = 'http://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/zhidao/pic/item/79f0f736afc379310ef054f0e5c4b74542a9114a.jpg';
    const pic2 = 'https://img.88icon.com/download/jpg/20200717/e7a5cbd5c2ae6d23ac572616b08cb95e_512_512.jpg!88bg';
    const pic3 = 'https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300'
    const VII = 'https://media-exp1.licdn.com/dms/image/C4E0BAQHO1gWqXmmqTA/company-logo_200_200/0/1560002759996?e=2159024400&v=beta&t=x69ceEOvO92a9RGh-iaC_cgW2a64JGd3RmRY74G9owM'

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

    const renderMoods = ({ item }) => {
      return (

        <View style = {styles.item}>
            <Text> {item.id} </Text>
            <Image source = {item.pic}
              style = {{width: 80,
                      height: 80}}/>
            <Text> {item.comment} </Text>
        </View>
      )
    }

    return (
      <View style = {styles.container}>
          <FlatList
            data = {moods}
            renderItem = {renderMoods}
          />

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
           color="#808080"
           onPress = {() => {
             setId(id+1)
             const newMoods =
               moods.concat(
                 {
                  'id':id,
                  'pic':pic,
                  'comment':comment,

               })
             setMoods(newMoods)
             storeData(newMoods)
             setComment("")

           }}
         />

         <Button
            title={"Clear"}
            color="red"
            onPress = {() => {
              clearAll()
              setMoods  ([])
              setId(1)
            }}
          />

      </View>

  );
}

const ComplaintsScreen = ({navigation}) => {
  const [id,setId] = useState(1)
  const [pic,setPic] = useState("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
  const [comment,setComment] = useState("")
  const [complaints,setComplaints]= useState([])
  const pic1 = 'http://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/zhidao/pic/item/79f0f736afc379310ef054f0e5c4b74542a9114a.jpg';
  const pic2 = 'https://img.88icon.com/download/jpg/20200717/e7a5cbd5c2ae6d23ac572616b08cb95e_512_512.jpg!88bg';
  const pic3 = 'https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300'
  const VII = 'https://media-exp1.licdn.com/dms/image/C4E0BAQHO1gWqXmmqTA/company-logo_200_200/0/1560002759996?e=2159024400&v=beta&t=x69ceEOvO92a9RGh-iaC_cgW2a64JGd3RmRY74G9owM'

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
       try {
         // the '@profile_info' can be any string
         const jsonValue = await AsyncStorage.getItem('@complaints')
         let data = null
         if (jsonValue!=null) {
           data = JSON.parse(jsonValue)
           setComplaints(data)
           console.log('just set Info')
         } else {
           console.log('just read a null value from Storage')
           // this happens the first time the app is loaded
           // as there is nothing in storage...
           setComplaints([])
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
        await AsyncStorage.setItem('@complaints', jsonValue)
        console.log('just stored '+jsonValue)
      } catch (e) {
        console.log("error in storeData ")
        console.dir(e)
        // saving error
      }
  }

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

  const renderComplaints = ({ item }) => {
    return (

      <View style = {styles.item}>
          <Text> {item.id} </Text>
          <Image source = {item.pic}
            style = {{width: 80,
                    height: 80}}/>
          <Text> {item.comment} </Text>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <FlatList
          data = {complaints}
          renderItem = {renderComplaints}
        />

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
         color="#808080"
         onPress = {() => {
           setId(id+1)
           const newComplaints =
             complaints.concat(
               {
                'id':id,
                'pic':pic,
                'comment':comment,

             })
           setComplaints(newComplaints)
           storeData(newComplaints)
           setComment("")

         }}
       />

       <Button
          title={"Clear"}
          color="red"
          onPress = {() => {
            clearAll()
            setComplaints([])
            setId(1)
          }}
        />


    </View>

);

}

const GossipsScreen = ({navigation}) => {
  const [id,setId] = useState(1)
  const [pic,setPic] = useState("https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300")
  const [comment,setComment] = useState("")
  const [gossips,setGossips]= useState([])
  const pic1 = 'http://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/zhidao/pic/item/79f0f736afc379310ef054f0e5c4b74542a9114a.jpg';
  const pic2 = 'https://img.88icon.com/download/jpg/20200717/e7a5cbd5c2ae6d23ac572616b08cb95e_512_512.jpg!88bg';
  const pic3 = 'https://img95.699pic.com/xsj/10/tm/0h.jpg!/fh/300'
  const VII = 'https://media-exp1.licdn.com/dms/image/C4E0BAQHO1gWqXmmqTA/company-logo_200_200/0/1560002759996?e=2159024400&v=beta&t=x69ceEOvO92a9RGh-iaC_cgW2a64JGd3RmRY74G9owM'

  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
       try {
         // the '@profile_info' can be any string
         const jsonValue = await AsyncStorage.getItem('@gossips')
         let data = null
         if (jsonValue!=null) {
           data = JSON.parse(jsonValue)
           setGossips(data)
           console.log('just set Info')
         } else {
           console.log('just read a null value from Storage')
           // this happens the first time the app is loaded
           // as there is nothing in storage...
           setGossips([])
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
        await AsyncStorage.setItem('@gossips', jsonValue)
        console.log('just stored '+jsonValue)
      } catch (e) {
        console.log("error in storeData ")
        console.dir(e)
        // saving error
      }
  }

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

  const renderGossips = ({ item }) => {
    return (

      <View style = {styles.item}>
          <Text> {item.id} </Text>
          <Image source = {item.pic}
            style = {{width: 80,
                    height: 80}}/>
          <Text> {item.comment} </Text>
      </View>
    )
  }

  return (
    <View style = {styles.container}>
        <FlatList
          data = {gossips}
          renderItem = {renderGossips}
        />

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
         color="#808080"
         onPress = {() => {
           setId(id+1)
           const newGossips =
             gossips.concat(
               {
                'id':id,
                'pic':pic,
                'comment':comment,

             })
           setGossips(newGossips)
           storeData(newGossips)
           setComment("")
         }}
       />

       <Button
          title={"Clear"}
          color="red"
          onPress = {() => {
            clearAll()
            setGossips([])
            setId(1)
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
    alignItems: 'space-between',
    justifyContent: 'space-between',
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

export default MyStack;
