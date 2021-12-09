import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      {/*header*/}
      <View style = {{flex: 2,backgroundColor: '#808080', justifyContent: 'center', padding: 10}}>
        <Text style = {styles.header}>
          Brandeis Anonymous Forum</Text>
      </View>

      {/*blank line*/}

        <Text style = {{fontSize: 20}}> Speak freely here as an anonymous......</Text>

      <View style = {{flexDirection: 'row', flex: 4}}>
        {/*Confessions*/}
          <TouchableOpacity
            style = {{flex: 1,backgroundColor: '#ffb6c1', justifyContent: 'center', alignItems: 'center'}}
            color = 'white'
            onPress={() =>
              navigation.navigate('Confessions')
            }
          >
              <Text style = {{color:'white', fontSize:20}}> Confessions</Text>
          </TouchableOpacity>


        {/*Moods*/}
          <TouchableOpacity
            style = {{flex: 1,backgroundColor: '#add8e6', justifyContent: 'center', alignItems: 'center'}}
            color = 'white'
            onPress={() =>
              navigation.navigate('Moods')
            }
          >
            <Text style = {{color:'white', fontSize:20}}> Moods</Text>
          </TouchableOpacity>
        </View  >

      <View style = {{flexDirection: 'row', flex: 4}}>
        {/*Complaints*/}
          <TouchableOpacity
            style = {{flex: 1,backgroundColor: '#b0c4ee', justifyContent: 'center', alignItems: 'center'}}
            color = 'white'
            onPress={() =>
              navigation.navigate('Complaints')
            }
            >
              <Text style = {{color:'white', fontSize:20}}>Complaints</Text>
            </TouchableOpacity>


        {/*Gossips*/}
          <TouchableOpacity
            style = {{flex: 1,backgroundColor: '#dda0dd', justifyContent: 'center', alignItems: 'center'}}
            color = 'white'
            onPress={() =>
              navigation.navigate('Gossips')
            }
            >
              <Text style = {{color:'white', fontSize:20}}>Gossips</Text>
          </TouchableOpacity>

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
    padding:5,
  },

  header: {
    fontSize: 40,
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
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1
  },

});

export default HomeScreen;
