import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity,Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NativeRouter, Switch, Route } from 'react-router-native';

export default class Form extends Component{
    render(){
      return (
    <View style={styles.container}>
        <Text style={{color: '#3E2723'}}> Welcome ! </Text>
       <TextInput style={styles.inputBox}  placeholder="Email Address"
       placeholderTextColor='#EFEBE9'/>
        <TextInput style={styles.inputBox}  placeholder="Password"
       placeholderTextColor='#EFEBE9'
       secureTextEntry={true}/>
       <TouchableOpacity style={styles.button} accessibilityRole={"button"} onPress={() =>{
       }
       }>
           <Text style={styles.buttonText}> {this.props.type} </Text>
       </TouchableOpacity>
       <StatusBar style="auto"/>
    </View>
      )}
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#F3E5F5',
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  inputBox:{
      width: 300,
      height: 50,
      backgroundColor: '#AB47BC',
      borderRadius: 25,
      paddingHorizontal: 26,
      fontSize:16,
      color: '#ffffff',
      marginVertical: 10
  },

  button:{
      width: 200,
      height: 22,
      backgroundColor: '#9575CD',
      borderRadius: 25,
      paddingHorizontal: 26,
      marginVertical: 10
  },
   buttonText:{
       fontSize:16,
       fontWeight:'600',
       color: '#EFEBE9',
       textAlign: 'center'
   }
});