import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WorkoutSessionContext} from './WorkoutSessionProvider';

const SetInput = ({exerciseIndex}) => {
  const {exerciseSets, updateExerciseSets} = useContext(WorkoutSessionContext);

  const handleAddSet = () => {
    const newSet = {weight: '', reps: '', id: Date.now()};
    const updatedSets = exerciseSets[exerciseIndex]
      ? [...exerciseSets[exerciseIndex], newSet]
      : [newSet];
    updateExerciseSets(exerciseIndex, updatedSets);
  };

  const handleDeleteSet = setId => {
    const updatedSets = exerciseSets[exerciseIndex].filter(
      set => set.id !== setId,
    );
    updateExerciseSets(exerciseIndex, updatedSets);
  };

  const handleWeightChange = (text, setId) => {
    const updatedSets = exerciseSets[exerciseIndex].map(set =>
      set.id === setId ? {...set, weight: text} : set,
    );
    updateExerciseSets(exerciseIndex, updatedSets);
  };

  const handleRepsChange = (text, setId) => {
    const updatedSets = exerciseSets[exerciseIndex].map(set =>
      set.id === setId ? {...set, reps: text} : set,
    );
    updateExerciseSets(exerciseIndex, updatedSets);
  };

  return (
    <View>
      {exerciseSets[exerciseIndex] &&
        exerciseSets[exerciseIndex].map((set, index) => (
          <View key={set.id} style={styles.container}>
            <Text style={styles.set}>{index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Weight (lbs)"
              keyboardType="numeric"
              value={set.weight}
              onChangeText={text => handleWeightChange(text, set.id)}
            />
            <TextInput
              style={styles.input}
              placeholder="Reps"
              keyboardType="numeric"
              value={set.reps}
              onChangeText={text => handleRepsChange(text, set.id)}
            />
            <Pressable
              style={styles.checkButton}
              onPress={() => {
                handleDeleteSet(set.id);
              }}>
              <Ionicons name="trash-sharp" size={20} />
            </Pressable>
          </View>
        ))}
      <Button title="Add Set" onPress={handleAddSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  set: {
    fontSize: 20,
    marginEnd: 10,
  },
  checkButton: {
    margin: 10,
  },
});

export default SetInput;
