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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Guide" component={GuideScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const MyStack = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="MyTab"
              component={MyTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name = "Home"
              component = {HomeScreen}
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


export default MyStack;
