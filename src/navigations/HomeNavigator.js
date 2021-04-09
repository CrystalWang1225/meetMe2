import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import EventScreen from '../services/EventScreen'
import Profile from '../services/Profile'
import ReservationScreen from '../services/ReservationScreen'
import SearchScreen from '../services/SearchScreen'
const TabStack = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <TabStack.Navigator initialRouteName="All Events" tabBarOptions={{activeTintColor: '#b794f6'}}>
      <TabStack.Screen name="All Events" component={EventScreen} options={{
          tabBarLabel: 'Event',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list-ul" size={size} color={color} />
          ),
        }}/>
        <TabStack.Screen name="Reservation" component={ReservationScreen} options={{
          tabBarLabel: 'Reservations',
          tabBarIcon: ({ color, size }) => (
           <FontAwesome name="flag-checkered" size={size} color={color}/>
          ),
        }}/> 
            <TabStack.Screen name="Search" component={SearchScreen} options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
           <FontAwesome name="search" size={size} color={color}/>
          ),
        }}/> 
    <TabStack.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
           <FontAwesome name="user-secret" size={size} color={color}/>
          ),
        }}/> 
    </TabStack.Navigator>
  );
}
