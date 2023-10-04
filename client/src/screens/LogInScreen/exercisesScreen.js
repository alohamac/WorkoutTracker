import React from 'react';
import { View, Text, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const ExercisesScreen = () => {
    return(
        <View style={styles.root}>
        <Text><FontAwesome6 name={'house'} solid /></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
      fontFamily: 'Helvetica Pro Textbook',
      padding: 20,
      paddingTop: Platform.OS === 'ios' ? 50 : 20, // Add extra padding for iOS devices with notche
    },
    boldText: {
      fontSize: 30, 
      fontWeight: 'bold',
      alignItems: 'baseline'
    }
});

export default ExercisesScreen; 