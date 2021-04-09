import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, Fragment } from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, View, TouchableOpacity, Modal, TouchableHighlight, Platform, Alert } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import Event from './Event'
import {userPass} from "../actions/Index"
import { TabRouter } from 'react-navigation';
 
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

function EventScreen(props) {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    //console.log("A", props)
    //console.log("BBBBBB", props.passToken)
    return <EventView isFocused={isFocused} navigation={navigation} passToken={props.passToken}/>
  }

  class EventView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          events_state : [],
        // adddropdown_currentinput: ""
      }
      this.wasFocused = false
      this.shoudlUpdate = false
      //this.UsernameLogin = this.props.route.params.UsernameLogin;
      //this.TokenLogin = this.props.route.params.TokenLogin;
      // console.log("AAAAAA",this.props)
    }
    async componentDidMount() {
      console.log("HERE!",this.props.passToken.token)
      await fetch("http://127.0.0.1:5000/api/events", {
        method: 'GET',
        headers: {
         'x-access-token': this.props.passToken.token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
        }
      }).then((response) => response.json())
        .then((json) => {
          this.setState({
            events_state: json
          })
          console.log(json)
        })
        .catch(function (error) {
          console.log('Error when fetch events', error);
        });
    }
    logout() {
      this.props.navigation.navigate('Login')
    }

    async componentDidUpdate() {
        if (this.props.isFocused){
          console.log("isFocused is true!")
          if (this.wasFocused){
            console.log("wasFocused is not true! ")
            this.shoudlUpdate = false
            return
          }
          this.wasFocused = true
          this.shoudlUpdate = true
        } else {
          this.wasFocused = false
          this.shoudlUpdate = false

          return
        }
        await fetch("http://127.0.0.1:5000/api/events", {
            method: 'GET',
            headers: {
            'x-access-token': this.props.passToken.token,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response) => response.json())
            .then((json) => {
              this.setState({
                events_state: json
              })
            })
            .catch(function (error) {
              console.log('Error when fetch events', error);
            });
          
    }
  
    getEvents() {
      let events = [];
      // console.log(this.props.meals_state);
      if (!this.state.events_state || this.state.events_state.length === 0) {
        // console.log()
        return <Text>No Event Data</Text>
      }
      for (const event of Object.values(this.state.events_state)) {
        // console.log(event)
        events.push(
  
          <Event eventData={event} key={event.event_id} id={event.event_id} passToken={this.props.passToken} />
        )
      }
      return events
    }
  
 
    render() {
      return (
        <View style={styles.outerView}>
          <ScrollView style={styles.scroll}>
            <View style={styles.container} >
              <View style={styles.innerview}>
                <TouchableOpacity style={styles.logout} onPress={() => this.logout()}>
                  <Text style={styles.logoutText}>
                    Logout
            </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.heading}>Events</Text>
  
              {this.getEvents()}
  
            </View>
  
          </ScrollView>
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
    dropdown: {
      flex: 1,
      alignItems: "center",
      minWidth: 0.9 * SCREEN_WIDTH,
      backgroundColor: "#2F3244",
      borderRadius: 20,
      maxHeight: 260,
      paddingTop: 0
    },
    scrollcontainer: {
      flex: 1,
      maxHeight: 0.4 * SCREEN_HEIGHT,
    },
    scrollview: {
      padding: 8,
      alignItems: 'center',
      marginHorizontal: 20,
    },
    heading: {
      fontSize: 30,
      color: '#2F3244',
      paddingTop: 50,
      marginBottom: 20,
      fontWeight: '600',
      //alignItems: center,
    },
    cardHeading: {
      color: '#2F3244',
      width: 0.8 * SCREEN_WIDTH,
    },
    innerview: {
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
      position: 'absolute',
    },
    logoutText: {
      fontSize: 18,
      color: 'white',
      fontWeight: '500',
    },
    scroll: {
      maxHeight: 0.8 * SCREEN_HEIGHT,
    },
    plusSign: {
      marginTop: 15,
    },
    plusSignSmall: {
      marginTop: 15,
      marginLeft: '80%'
    },
    plusView: {
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    outerView: {
      backgroundColor: '#fff',
      height: SCREEN_HEIGHT,
    },
    modalContent: {
      margin: 20,
      backgroundColor: "#2F3244",
      borderRadius: 20,
      paddingHorizontal: 0,
      paddingVertical: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    cancelButton: {
      backgroundColor: "#30CEB9",
      borderRadius: 15,
      padding: 10,
      elevation: 2,
      width: 0.36 * SCREEN_WIDTH,
      marginHorizontal: 8,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 15,
      color: 'white',
      marginRight: 10,
    },
    dateText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 15,
      color: 'white',
      marginRight: 17,
      marginLeft: -20
    },
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: -0.2 * SCREEN_HEIGHT,
      width: 0.9 * SCREEN_WIDTH,
      height: 0.6 * SCREEN_HEIGHT,
      marginLeft: 0.05 * SCREEN_WIDTH,
      paddingHorizontal: 0
    },
    modalTitle: {
      marginBottom: 22,
      marginTop: 8,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 25,
      color: 'white',
    },
    SaveAndCancel: {
      flexDirection: "row",
      marginTop: 10,
    },
    input: {
      marginBottom: 10,
      paddingVertical: 4,
      maxWidth: 200,
    },
    input_Duration: {
      marginBottom: 10,
      paddingVertical: 4,
      maxWidth: 160,
    },
    TitleAndInput: {
      flexDirection: "row",
      alignItems: 'center',
    },
    yearInput: {
      marginBottom: 10,
      paddingVertical: 4,
      maxWidth: 65,
    },
    monthAndDayInput: {
      marginBottom: 10,
      paddingVertical: 4,
      maxWidth: 48,
    },
    dash: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 15,
      color: 'white',
      marginHorizontal: 6,
    },
  });
  
  const mapStateToProps = (state) => {
    return {
      passToken: state.passToken,
    }
  }
  const mapDispatchToProps = () => {
    return {
      userPass,
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps())(EventScreen)