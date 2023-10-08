import React from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AlphabetList } from 'react-native-section-alphabet-list';

const ExercisesScreen = () => {
  const [exercises, SetExercises] = useState([]);
  useEffect(() => {
    async function fetchExercises() {
      const baseUrl = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
      try {
        const user = JSON.parse(await AsyncStorage.getItem('userid'));
        await fetch(`http://${baseUrl}:8080/exercises/getExercises/${user}`)
        .then(res=>res.json())
        .then((result)=>{
          SetExercises(result);
        }).catch((error)=>{
          console.log(error)
        })
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    fetchExercises();
  }, [])

  return (
    <View style={styles.root}>
      <AlphabetList
        data={exercises}
        indexLetterStyle={{ 
          color: 'blue', 
          fontSize: 12,
        }}  
        renderItem={({ item }) => (
          <View>
            <Text style={styles.boldText}>{item.value} FUCK</Text>
          </View>
        )}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}  
      />
    </View>
  );
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