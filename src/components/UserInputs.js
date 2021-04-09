import React, { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export function UserInputs({ style, getInput,inputType,...props }) {
    const [input, setInput] = useState("");
    function obtainInput(inputVal) {
        setInput(inputVal);
        ////console.log(inputVal);
        getInput(inputVal);
    }

    return <TextInput {...props} style={[style, styles.input]} onChangeText={obtainInput} defaultValue={input}keyboardType={inputType}/>;
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#D1C4E9',
        width: '90%',
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        marginVertical: 5,
        marginRight: 5,
        color: '#795548'
    },
});