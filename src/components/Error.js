import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export function Error({errorMssg}) {
  return (
    <View style={styles.container}> 
        <Text style={styles.error} >{errorMssg}</Text>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    error: {
        color: 'red',
    },
});