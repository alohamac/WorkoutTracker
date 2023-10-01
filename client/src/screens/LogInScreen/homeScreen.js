import {View, Text, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import useUserFetch from '../../helpers/AsyncStorageUtils';

import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () =>{
    const [idk, setIdk] = useState(null);

    useEffect(() => {
      async function fetchUser() {
        try {
          const user = await AsyncStorage.getItem('user');
          setIdk(user);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
  
      fetchUser();
    }, []); // Empty dependency array ensures this effect runs once on component mount
  
  
    return (
        <View style={styles.root}>
            <Text>{idk}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 40 : 0, // Add extra padding for iOS devices with notche
    },
});

export default HomeScreen;