import React, { Fragment, useState } from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, View, TouchableOpacity,TouchableHighlight, Modal, Alert} from 'react-native';
import { Button, Card } from 'react-native-elements';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
import { connect } from 'react-redux'
import {UserInputs} from '../components/UserInputs'


class Registration extends React.Component{
    constructor(props){
        super(props)
        this.state = {
           event_id: 0,
           creator: '',
           event_name: ' ',
           duration: '',
           date: '',
           city: '',
           state: '',
           description: '',
           note: '',
        }
    }

    getDescription(description) {
        this.setState({ description: description });
      }


    render() {
        return (
            <Card>
                <Card.Title style={styles.cardHeading}>Registered #{this.props.count}</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 8 }}>
                    Created by: {this.props.regiData.creator}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Location: {this.props.regiData.city},{this.props.regiData.State}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Date: {this.props.regiData.date}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Duration: {this.props.regiData.duration}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Date: {this.props.regiData.date}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    Description: {this.props.regiData.description}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    My Note: {this.props.regiData.note}
                </Text>
                 <View style={styles.EditAndDelete}>
                    {/* <Button
                        buttonStyle={{ backgroundColor: '#2F3244', borderRadius: 10, width: 140,marginLeft:10}}
                        title='Delete' onPress={() => this.remove()}/> */}
                </View> 
            </Card>
        )
    }
}
export default Registration;

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

