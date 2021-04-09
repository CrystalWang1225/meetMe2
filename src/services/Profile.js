import { StatusBar } from 'expo-status-bar';
import React, { Fragment } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserInputs } from '../components/UserInputs';
import { Error } from '../components/Error';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { connect } from 'react-redux'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

function Profile(props) {
    const route = useRoute();
    const navigation = useNavigation();
    //console.log("Here!!Profile!!!", props.passToken)
    return <UserProfile route={route} navigation={navigation} passToken={props.passToken} />
  }

  class UserProfile extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        firstname: 'Firstname',
        lastname: 'Lastname',
        username: 'Username',
        institution: 'Institution',
        occupation: 'Occupation',
        isSave: false
      }
    }
    logout() {
      this.props.navigation.navigate('Login')
    }

    async componentDidMount() {
      //console.log("LOOK!!!!", this.props.passToken.token);
      await fetch('http://127.0.0.1:5000/api/user' , {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': this.props.passToken.token,
  
        }
      }).then((response) => response.json())
        .then((json) => {
          this.setState({
            firstname: json.firstname,
            lastname: json.lastname,
            username: json.username,
            institution: json.institution,
            occupation: json.occupation,
          })
          console.log(json)
  
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.view}>
        <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>
            Logout</Text>
        </TouchableOpacity>
            </View>

            <Text style={styles.heading}>PROFILE</Text>
            <Text style={styles.subHeading}>Welcome ! {this.state.username} </Text>
          <Text style={styles.subHeading}>First Name: {this.state.firstname} </Text>

          {/* <UserInputs style={styles.input} placeholder={this.state.firstname} getInput={(InputFirstname) => this.getFirstname(InputFirstname)} /> */}
          <Text style={styles.subHeading}>Last Name: {this.state.lastname} </Text>
          <Text style={styles.subHeading}>Institution: {this.state.institution} </Text>
          <Text style={styles.subHeading}>Occupation: {this.state.occupation} </Text>


          {/* <UserInputs style={styles.input} placeholder={this.state.lastname} placeholderTextColor='#EFEBE9' getInput={(InputLastname) => this.getLastname(InputLastname)} /> */}
          
          {/* <TouchableOpacity style={styles.button} onPress={() => this.updateProfile()}>
            <Text style={styles.loginText}>
              Save
          </Text>
          </TouchableOpacity>
          {this.state.isSave ? <Text style={styles.message}>
            Saved!
          </Text> : <Text style={styles.message2}>
              Saved!
          </Text>} */}
                  </View>

        
        )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    heading: {
      fontSize: 30,
      color: '#2F3244',
      paddingTop: 50,
      marginBottom: 40,
      fontWeight: '600',
    },
    input: {
      marginBottom: 10,
      padding: 5,
    },
    button: {
      backgroundColor: '#30CEB9',
      padding: 16,
      borderRadius: 5,
      width: '90%',
      alignItems: 'center',
      marginTop: 5,
    },
    view:{
      width: SCREEN_WIDTH,
      alignItems: 'flex-end',
      marginRight: 40,
    },
    logout: {
      backgroundColor: '#b794f6',
      padding: 9,
      borderRadius: 15,
      width: '21%',
      height: 42,
      marginTop: 45,
      marginRight: -50,
      position:'absolute',
      
    },
    message: {
      padding: 15,
      alignItems: 'center',
      marginTop: -10,
      color: '#30CEB9',
      fontSize: 14
    },
    message2: {
      padding: 15,
      alignItems: 'center',
      marginTop: -10,
      color: 'white',
      fontSize: 14
    },
    createAccountText: {
      color: '#30CEB9',
      fontWeight: '600',
      fontSize: 15,
    },
    subHeading: {
      color: '#2F3244',
      fontSize: 16,
      marginVertical: 5
    },
    logoutText: {
      fontSize: 18,
      color: 'white',
      fontWeight: '500',
    },
  });
  

const mapStateToProps = (state) => {
    return {
      passToken: state.passToken,
    }
  }
  const mapDispatchToProps = () => {
    return {
      //userPass,
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps())(Profile)