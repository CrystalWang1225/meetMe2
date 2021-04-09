import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../services/Login';
import Signup from '../services/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const ScreenStack = createStackNavigator();

export function ScreenStackNavigator() {
  return (
    <ScreenStack.Navigator screenOptions={{headerShown: false}}>
      <ScreenStack.Screen name={'Login'} component={Login} />
      <ScreenStack.Screen name={'Signup'} component={Signup} />

    </ScreenStack.Navigator>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#F3E5F5',
      flex:1,
      justifyContent: 'center'
    }
  });