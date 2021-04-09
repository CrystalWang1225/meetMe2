import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { NativeRouter, Switch, Route } from 'react-router-native';
import { Error } from '../components/Error';
import { connect } from 'react-redux'
import {userPass} from "../actions/Index"
import { useDispatch } from 'react-redux'
import {UserInputs} from '../components/UserInputs'

export default function Login ({navigation}){
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMssg, setErrorMssg] = useState("");
  const[institution, setInstitution] = useState("");
  const[occupation, setOccupation] = useState("");
  const [token, setToken] = useState([]);
  const dispatch = useDispatch();
  let opt = {
    'username': username,
    'firstname': firstname,
    'lastname': lastname,
    'username': username,
    'email': email,
    'password': password,
    'occupation': occupation,
    'institution': institution,
  }
  async function validateSignup() {
    await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(opt)
    }).then((response) => response.json())
        .then((json) => {
          console.log(json["status"]);
            if (json["status"] != 200) {
                console.log("Hi there")
                setErrorMssg("There is something wrong here");
                Alert.alert("Error message: Username or password is incorrect!Please retype your email or password")
            } else {
              console.log("Herro")
              console.log(json)
                setErrorMssg("");
                //setToken(json.token)
                 // props.userPass(username,json.token)
                Alert.alert("Successfully signed up, please proceed to log in")
                navigation.navigate('Login');
                dispatch(userPass(email,json.token))
                
            }
        })
        .catch(function (error) {
        });
}

function getUsername(InputUsername) {
  setUsername(InputUsername);
  ////console.log(username);
}
function getFirstName(FirstName) {
  setFirstname(FirstName);
}

function getLastName(LastName) {
  setLastname(LastName);
}

function getUserName(UserName) {
  setUsername(UserName);
}

function getInputEmail(InputEmail) {
    setEmail(InputEmail);
}
function getInputPassword(InputPassword) {
    setPassword(InputPassword);
    ////console.logog(password);
}
function getInputInstitution(InputInstitution) {
  setInstitution(InputInstitution);
}
function getInputOccupation(InputOccupation) {
  setOccupation(InputOccupation);
}

    return(
    <View style={styles.container}>
      <Text> Register </Text>
      <Text style={{color: '#3E2723'}}> Welcome ! </Text>
      <Error errorMssg={errorMssg} />
      <UserInputs style={styles.input} placeholder={'Email Address'} placeholderTextColor='#EFEBE9' getInput={(InputEmail) => getInputEmail(InputEmail)} />
      <UserInputs style={styles.input} placeholder={'User Name'} placeholderTextColor='#EFEBE9' getInput={(UserName) => getUserName(UserName)} />
      <UserInputs style={styles.input} placeholder={'First Name'} placeholderTextColor='#EFEBE9' getInput={(FirstName) => getFirstName(FirstName)} />
      <UserInputs style={styles.input} placeholder={'Last Name'} placeholderTextColor='#EFEBE9' getInput={(LastName) => getLastName(LastName)} />
      <UserInputs style={styles.input} placeholder={'Password'} placeholderTextColor='#EFEBE9' secureTextEntry={true} getInput={(InputPassword) => getInputPassword(InputPassword)} />
      <UserInputs style={styles.input} placeholder={'Institution'} placeholderTextColor='#EFEBE9' getInput={(InputInstitution) => getInputInstitution(InputInstitution)} />
      <UserInputs style={styles.input} placeholder={'Occupation'} placeholderTextColor='#EFEBE9' getInput={(InputOccupation) => getInputOccupation(InputOccupation)} />
       <TouchableOpacity style={styles.button} accessibilityRole={"button"} onPress={() =>{
         validateSignup()
       }
       }>
           <Text style={styles.buttonText}> Sign Up </Text>
       </TouchableOpacity>
  
      <View style={styles.signupTextCont}>  
        <Text style={styles.signupText}> Already Have an Account?</Text>
        <TouchableOpacity accessibilityRole={"button"} style={styles.switchButton} onPress={() => {
                Alert.alert("You are going to the sign up page")
                navigation.navigate('Login');
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
      backgroundColor: '#B39DDB',
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