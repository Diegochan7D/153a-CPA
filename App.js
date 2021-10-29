import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './components/HomeScreen'
import GuideScreen from './components/GuideScreen'
import ConfessionsScreen from './components/ConfessionsScreen'
import MoodsScreen from './components/MoodsScreen'
import ComplaintsScreen from './components/ComplaintsScreen'
import GossipsScreen from './components/GossipsScreen'
import SettingsScreen from './components/SettingsScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MyTab = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options = {{headerStyle: {backgroundColor: '#808080'}}}/>
        <Tab.Screen name="Guide" component={GuideScreen} options = {{headerStyle: {backgroundColor: '#808080'}}}/>
        <Tab.Screen name="Settings" component={SettingsScreen} options = {{headerStyle: {backgroundColor: '#808080'}}}/>
      </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Back"
              component={MyTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name = "Home"
              component = {HomeScreen}
              options = {{headerStyle: {backgroundColor: '#808080'}}}
            />
            <Stack.Screen
              name = "Confessions"
              component = {ConfessionsScreen}
              options = {{headerStyle: {backgroundColor: '#ffb6c1'}}}
            />
            <Stack.Screen
              name = "Moods"
              component = {MoodsScreen}
              options = {{headerStyle: {backgroundColor: '#add8e6'}}}
            />
            <Stack.Screen
              name = "Complaints"
              component = {ComplaintsScreen}
              options = {{headerStyle: {backgroundColor: '#b0c4ee'}}}
            />
            <Stack.Screen
              name = "Gossips"
              component = {GossipsScreen}
              options = {{headerStyle: {backgroundColor: '#dda0dd'}}}
            />

          </Stack.Navigator>
        </NavigationContainer>

  );
};


export default MyStack;
