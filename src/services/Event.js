import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, View, TouchableOpacity,TouchableHighlight, Modal, Alert} from 'react-native';
import { Button, Card } from 'react-native-elements';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
import { connect } from 'react-redux'
import {UserInputs} from '../components/UserInputs'


class Event extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           event_id: 0,
           creator_id: 0,
           city : '',
           state: '',
           location: '',
           cost: 0,
           capacity:0,
           duration: '',
           date: '',
           event_name:'',
           description: '',
           descripShow: false
        }
    }
    async addDescription(){
        this.setState({descripShow : true})
    }

    async exitNote(){
        this.setState({descripShow : false})
    }

    getDescription(description) {
        this.setState({ description: description });
      }

    async reserve(){
    await fetch('http://127.0.0.1:5000/api/reserve', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': 'Basic dGVzdEB0ZXN0LmNvbToxMjM0'
        },
        body: JSON.stringify({
            event_id: this.props.id,

            description: this.state.description
        })
      }).then((response) => response.json())
        .then((json) => {
          Alert.alert("You have successfully reserved !")
          //console.log(json)
        })
        .catch(function (error) {
          //console.log('Request failed', error);
        });   
    }
    render() {
        return (
            <Card>
                <Card.Title style={styles.cardHeading}>{this.props.eventData.event_name}</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 8 }}>
                    City: {this.props.eventData.city}
                </Text>
                <Text style={{ marginBottom: 8 }}>
                    State: {this.props.eventData.state}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Location: {this.props.eventData.location}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Cost: {this.props.eventData.cost}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Capacity: {this.props.eventData.capacity}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Duration: {this.props.eventData.duration}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Date: {this.props.eventData.date}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Description: {this.props.eventData.description}
                </Text>
                 <View style={styles.EditAndDelete}>
                    <Button
                        buttonStyle={{ backgroundColor: '#6D4C41', borderRadius: 10, width: 140, marginRight:10}}
                        title='Register' onPress={() => this.addDescription()}/>
                    {/* <Button
                        buttonStyle={{ backgroundColor: '#2F3244', borderRadius: 10, width: 140,marginLeft:10}}
                        title='Delete' onPress={() => this.remove()}/> */}
                </View> 

        <Modal transparent={true} visible={this.state.descripShow} animationType="slide">
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Note for your Reservation</Text>
              <View style={styles.TitleAndInput}>
                <Text style={styles.modalText}>Notes:     </Text>
                <UserInputs style={styles.input} placeholder="Notes" getInput={(description) => this.getDescription(description)} />
              </View>
              <TouchableHighlight style={styles.cancelButton} onPress={() => { this.reserve(); }}>
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.cancelButton} onPress={() => { this.exitNote(); }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
              </View>
        </Modal>

            </Card>
        )
    }
}
export default Event;

const styles = StyleSheet.create({
    cardHeading: {
        color: '#2F3244',
        width: 0.8 * SCREEN_WIDTH,
    },
    EditAndDelete: {
        flexDirection: "row",
    },
    modalContent: {
        margin: 20,
        backgroundColor: "#6D4C41",
        borderRadius: 15,
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
        backgroundColor: "#b794f6",
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        width: 0.4 * SCREEN_WIDTH,
        marginHorizontal: 8,
        marginVertical: 10
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
        fontSize: 14,
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
        marginHorizontal: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
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

