import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Error } from '../components/Error';
import { connect } from 'react-redux'
import {userPass} from "../actions/Index"
import { useDispatch } from 'react-redux'
import {UserInputs} from '../components/UserInputs'
import base64 from 'base-64'
export default function Login ({navigation}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMssg, setErrorMssg] = useState("");
  const [token, setToken] = useState([]);
  const dispatch = useDispatch();
  let opt = {
    'email': email,
    'password': password
  }
  async function validateLogin() {
    await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + base64.encode(email+ ":" + password),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(opt)
    }).then((response) => response.json())
        .then((json) => {
            if (!json.token) {
                console.log(json)
                console.log("Wrong")
                setErrorMssg("Email or password is incorrect!");
                Alert.alert("Error message: Username or password is incorrect!Please retype your email or password")
            } else {
              console.log(json)
                setErrorMssg("");
                setToken(json.token)
                 // props.userPass(username,json.token)
                Alert.alert("Successfully logged in")
                navigation.navigate('Home');
                dispatch(userPass(email,json.token))
            }
        })
        .catch(function (error) {
        });
}
async function getInputEmail(InputEmail) {
    setEmail(InputEmail);
}
async function getInputPassword(InputPassword) {
    setPassword(InputPassword);
    ////console.logog(password);
}
    return(
    <View style={styles.container}>
      <Text> Login </Text>
      <Text style={{color: '#3E2723'}}> Welcome ! </Text>
      <Error errorMssg={errorMssg} />
      <UserInputs style={styles.input} placeholder={'Email Address'} placeholderTextColor='#EFEBE9' getInput={(InputEmail) => getInputEmail(InputEmail)} />
      <UserInputs style={styles.input} placeholder={'Password'} placeholderTextColor='#EFEBE9' secureTextEntry={true} getInput={(InputPassword) => getInputPassword(InputPassword)} />
       <TouchableOpacity style={styles.button} accessibilityRole={"button"} onPress={() =>{
         validateLogin()
       }
       }>
           <Text style={styles.buttonText}> Log In </Text>
       </TouchableOpacity>
      <View style={styles.signupTextCont}>  
        <Text style={styles.signupText}> Don't have an account yet?</Text>
        <TouchableOpacity accessibilityRole={"button"} style={styles.switchButton} onPress={() => {
                Alert.alert("You are going to the sign up page")
                navigation.navigate('Signup');
            }}>
            <Text style={styles.signupButton}> Sign up</Text>
            </TouchableOpacity>        
            <StatusBar style="auto"/>
      </View>
    </View>
  );}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#EDE7F6',
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 150
  },
  signupTextCont:{
    flexGrow:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:16,
    flexDirection: 'row'
    },
  signupButton:{
    color: '#7986CB',
    fontSize: 16,
    fontWeight: '600'
  },
  switchButton:{
    padding:5,
    alignItems:'center',
    justifyContent: 'center',
    paddingLeft:1,
    marginTop: 1
  },
  signupText:{
    color: '#3E2723',
    fontSize: 16 
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
      backgroundColor: '#B39DDB',
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