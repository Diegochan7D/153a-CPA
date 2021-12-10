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
import ProfilePage from './components/ProfilePage'
import AccountPage from './components/AccountPage'
import ValueProvider from './components/ValueContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyTab = () => {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Guide') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'grey',
          tabBarInactiveTintColor: 'gray',
        })}
      >

          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options = {{headerStyle: {backgroundColor: '#808080'}}}/>
          <Tab.Screen
            name="Guide"
            component={GuideScreen}
            options = {{headerStyle: {backgroundColor: '#808080'}}}/>
          <Tab.Screen
            name="Account"
            component={AccountPage}
            options = {{headerStyle: {backgroundColor: '#808080'}}}/>
        </Tab.Navigator>

  );
};

const MyStack = () => {
  const data =
    {name:"",
     email:"",
     appURL: 'https://blooming-castle-71107.herokuapp.com',
     //appURL: 'http://127.0.0.1:3000',
     secret: "",
   }
  return (
        <ValueProvider value={data}>
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
              <Stack.Screen
                name = "Account"
                component = {AccountPage}
                options = {{headerStyle: {backgroundColor: '#808080'}}}
              />
              <Stack.Screen
                name = "Profile"
                component = {ProfilePage}
                options = {{headerStyle: {backgroundColor: '#808080'}}}
              />

            </Stack.Navigator>
          </NavigationContainer>
        </ValueProvider>
  );
};


export default MyStack;
