import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AlphabetList} from 'react-native-section-alphabet-list';

const SelectExercises = ({setSelectedExercises, selectedExercises}) => {
  const [exercises, SetExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
      const baseUrl = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
      try {
        const user = JSON.parse(await AsyncStorage.getItem('userid'));
        await fetch(`http://${baseUrl}:8080/exercises/getExercises/${user}`)
          .then(res => res.json())
          .then(result => {
            SetExercises(result);
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    fetchExercises();
  }, []);


  return (
    <View style={styles.root}>
      <AlphabetList
        style={styles.alphabetList}
        data={exercises}
        indexLetterStyle={{
          color: 'blue',
          fontSize: 12,
        }}
        renderCustomItem={item => (
          <Pressable
            style={[
              styles.listItemContainer,
              selectedExercises.includes(item)
                ? styles.listItemSelected
                : null,
            ]}
            onPress={() => setSelectedExercises(item)}>
            <Text style={styles.listItemLabel}>{item.value}</Text>
            <Text style={styles.listItemCategory}>{item.category}</Text>
          </Pressable>
        )}
        renderCustomSectionHeader={section => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}
        indexContainerStye={{background: 'red'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Helvetica Pro Textbook',
    padding: 10,
    flex: 1,
    //paddingTop: Platform.OS === 'ios' ? 50 : 20, // Add extra padding for iOS devices with notche
  },
  sectionHeaderContainer: {
    paddingTop: 15,
  },
  sectionHeaderLabel: {
    color: 'grey',
    fontSize: 16,
  },
  listItemContainer: {
    borderTopColor: 'grey',
    borderTopWidth: 1,
  },
  listItemLabel: {
    height: Platform.OS === 'ios' ? 20 : 25,
    fontSize: 20,
    paddingBottom: Platform.OS === 'ios' ? 25 : 0,
  },
  listItemCategory: {
    fontSize: 14,
    paddingBottom: 5,
    color: 'grey',
  },
  listItemSelected: {
    backgroundColor: 'lightblue',
  },
});

export default SelectExercises;
