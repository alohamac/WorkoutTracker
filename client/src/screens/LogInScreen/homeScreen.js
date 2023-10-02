import {View, Text, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () =>{
    const [data, setData] = useState(null);

    useEffect(() => {
      async function fetchUser() {
        try {
          const user = await AsyncStorage.getItem('user');
          setData(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
  
      fetchUser();
    }, []); // Empty dependency array ensures this effect runs once on component mount
  
  
    return (
        <View style={styles.root}>
            <Text>Profile</Text>
            <Text style = {styles.text}>{data ? JSON.parse(data).username : ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 0, // Add extra padding for iOS devices with notche
    },
    text: {
      fontFamily: 'Helvetica Pro Textbook',
      fontSize: 30, 
      fontWeight: 'bold',
      alignItems: 'baseline'
    }
});

export default HomeScreen;