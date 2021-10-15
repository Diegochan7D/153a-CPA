import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      {/*header*/}
      <View style = {{flex: 2,backgroundColor: '#808080', justifyContent: 'center'}}>
        <Text style = {styles.header}>
          Brandeis Anonymous Forum</Text>
      </View>

      {/*blank line*/}

        <Text style = {{fontSize: 20}}> Choose a branch, and speak freely here as an anonymous......</Text>

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
