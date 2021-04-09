import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, Fragment } from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, View, TouchableOpacity, Modal, TouchableHighlight, Platform, Alert } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Event from './Event'
import {userPass} from "../actions/Index"
import {UserInputs} from '../components/UserInputs'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

function SearchScreen(props) {
    const navigation = useNavigation();
    //console.log("A", props)
    //console.log("BBBBBB", props.passToken)
    return <SearchView navigation={navigation} passToken={props.passToken}/>
  }

  class SearchView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          events_state : [],
          addFormShow : false,
          newEventName: '',
          newCity: '',
          newState: '',
          newCost: 0,
          newYear: 0,
          newMonth: 0,
          newDay: 0,
        // adddropdown_currentinput: ""
      }
      //this.UsernameLogin = this.props.route.params.UsernameLogin;
      //this.TokenLogin = this.props.route.params.TokenLogin;
      // console.log("AAAAAA",this.props)
    }
    async componentDidMount() {
    //   // for getting the events created by this specific account
    //   await fetch("http://127.0.0.1:5000/api/events/" + this.props.passToken.token, {
    //     method: 'GET',
    //     headers: {
    //      'x-access-token': this.props.passToken.token,
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
          
    //     }
    //   }).then((response) => response.json())
    //     .then((json) => {
    //       this.setState({
    //         events_state: json
    //       })
    //      // console.log(json)
    //     })
    //     .catch(function (error) {
    //       console.log('Error when fetch events', error);
    //     });
    // // for getting my reserved events
    //   await fetch("http://127.0.0.1:5000/api/list_reserves", {
    //     method: 'GET',
    //     headers: {
    //      'x-access-token': this.props.passToken.token,
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     }
    //   }).then((response) => response.json())
    //     .then((json) => {
    //         console.log("json, ", json)
    //       this.setState({
    //         register_state: json
    //       })
    //      // console.log(json)
    //     })
    //     .catch(function (error) {
    //       console.log('Error when fetch reserves', error);
    //     });
    }
    logout() {
      this.props.navigation.navigate('Login')
    }

    async search(){
    let params = {
        event_name: this.state.newEventName,
        city: this.state.newCity,
        state: this.state.newState,
        cost: this.state.newCost,
        year: this.state.newYear,
        month: this.state.newMonth,
        day: this.state.newDay
    }

    let url = new URL("http://127.0.0.1:5000/api/search")
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    await fetch(url , {
            method: 'GET',
            headers: {
              'x-access-token': this.props.passToken.token,
              'Accept': 'application/json', 
              'Content-Type': 'application/json'
            },
          }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.setState({
                            events_state: json
                          })
            })
            .catch(function (error) {
              console.log('Error when fetch events with specified', error);
            });
          this.addFormClose(); 
    }
    // async componentDidUpdate() {

    //     await fetch("http://127.0.0.1:5000/api/events", {
    //         method: 'GET',
    //         headers: {
    //         'x-access-token': this.props.passToken.token,
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json'
    //         }
    //       }).then((response) => response.json())
    //         .then((json)  => {
    //           this.setState({
    //             events_state: json
    //           })
    //           console.log("for updating")
    //         })
    //         .catch(function (error) {
    //           console.log('Error when fetch events', error);
    //         });
    // }
  
    getEvents() {
      
      let events = [];
      // console.log(this.props.meals_state);
      if (!this.state.events_state || this.state.events_state.length === 0) {
        // console.log()
        return <Text>No My Event Data</Text>
      }
      for (const event of Object.values(this.state.events_state)) {
        events.push(
  
          <Event eventData={event} key={event.event_id} id={event.event_id} passToken={this.props.passToken} />
        )
      }
      return events
    }

    getNewEventName(name){
        this.setState({newEventName: name})
    }
    getNewCapacity(capacity){
        this.setState({newCapacity: capacity})
    }

    getNewCity(city){
        this.setState({newCity: city})
    }

    getNewState(state){
        this.setState({newState: state})
    }

    addFormShow() {
        this.setState({ addFormShow: true });
      }
    addFormClose(){
        this.setState({ addFormShow: false});
    }

      getNewLocation(location) {
        this.setState({ newLocation: location });    
      }
    
      getNewDuration(duration) {
        this.setState({ newDuration: duration });
        //console.log('newDuration', this.state.newDuration);
        //console.log(duration)
      }

      getNewDescription(description) {
        this.setState({ newDescription: description });
        //console.log('newDuration', this.state.newDuration);
        //console.log(duration)
      }

      getNewCost(cost){
          this.setState({newCost: cost});
      }

      getNewDateYear(year) {
        this.setState({ newYear: year });   
      }
    
      getNewDateMonth(month) {
        this.setState({ newMonth: month });
      }
    
      getNewDateDay(day) {
        this.setState({ newDay: day });
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
              <Text style={styles.heading}>Search</Text>  
              <Text style={styles.subheading}>Results</Text>
                            {this.getEvents()}
            </View>
          </ScrollView>
          <View style={styles.plusView}>
          <Button type="clear" icon={<AntDesign name="questioncircle" size={50}
            color="#b794f6" style={styles.plusSign}
            onPress={() => this.addFormShow()} />} />
        </View>

        <Modal transparent={true} visible={this.state.addFormShow} animationType="slide">
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Search Event</Text>

              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>Event Name:</Text>
                <UserInputs style={styles.input} placeholder="Event Name" getInput={(name) => this.getNewEventName(name)} />
              </View>

              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>  Date:     </Text>
                <UserInputs inputType={'numeric'} style={styles.yearInput} placeholder="2021" getInput={(year) => this.getNewDateYear(year)} />
                <Text style={styles.dash}>-</Text>
                <UserInputs inputType={'numeric'} style={styles.monthAndDayInput} placeholder="05" getInput={(month) => this.getNewDateMonth(month)} />
                <Text style={styles.dash}>-</Text>
                <UserInputs inputType={'numeric'} style={styles.monthAndDayInput} placeholder="01" getInput={(day) => this.getNewDateDay(day)} />
              </View>

              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>  City:</Text>
                <UserInputs  style={styles.input} placeholder="City" getInput={(city) => this.getNewCity(city)} />
              </View>

               <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>  State:</Text>
                <UserInputs  style={styles.input} placeholder="State" getInput={(state) => this.getNewState(state)} />
              </View>

              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>  Location:</Text>
                <UserInputs  style={styles.input} placeholder="Location" getInput={(location) => this.getNewLocation(location)} />
              </View>

              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>Budget Under: </Text>
                <UserInputs inputType={'numeric'} style={styles.input} placeholder="Budget" getInput={(cost) => this.getNewCost(cost)} />

                <Text style={styles.TitleAndInput, { marginBottom: 8, color: 'white' }}> USD</Text>
              </View>

              <View style={styles.SaveAndCancel}>
                <TouchableHighlight style={styles.cancelButton} onPress={() => { this.search(); }}>
                  <Text style={styles.textStyle}>Search</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.cancelButton} onPress={() => { this.addFormClose(); }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>  
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
    innercontainer : {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        maxHeight: 0.5 * SCREEN_HEIGHT,
        borderColor: 'black',
        borderBottomWidth: 2,
        width: SCREEN_WIDTH  
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
      marginHorizontal:10,
      paddingRight: 10,
      fontWeight: '600',
      //alignItems: center,
    },
    subheading:{
        fontSize:20,
        color: '#2F3244',
        paddingTop: 10,
        paddingHorizontal:120,
        marginBottom: 20,
        marginHorizontal:10,
        paddingRight: 120,
        fontWeight: '500',
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
      backgroundColor: "#9575CD",
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
      backgroundColor: "#7986CB",
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
  
  export default connect(mapStateToProps, mapDispatchToProps())(SearchScreen)
