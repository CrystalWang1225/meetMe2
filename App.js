import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux';
import reducers from './src/reducers/index';
import {Provider} from 'react-redux';
import {ScreenStackNavigator} from './src/navigations/ScreenStackNavigator';
import {BottomTabs} from './src/navigations/HomeNavigator';

const Store = createStore(reducers);
const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen  name={'ScreenStack'} component={ScreenStackNavigator} options={{gestureEnabled: false }}/>
            <Stack.Screen name={'Home'} component={BottomTabs} options={{ gestureEnabled: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F3E5F5',
    flex:1,
    justifyContent: 'center'
  }
});
