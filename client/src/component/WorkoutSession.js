import React, {useCallback, useMemo, useRef, useState, useContext} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';
import SetInput from './SetInput';
import {ScrollView} from 'react-native-gesture-handler';
import WorkoutSessionProvider, {
  WorkoutSessionContext,
} from './WorkoutSessionProvider';

const WorkoutSession = () => {
  const bottomSheetRef = useRef(null);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [Exercises] = useState([]);
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);
  const handleSheetChanges = useCallback(index => {}, []);
  const {exerciseSets} = useContext(WorkoutSessionContext);

  const closeExerciseModal = () => {
    setExerciseModalVisible(false);
  };

  const toggleExerciseListVisibility = () => {
    setIsExerciseListVisible(!isExerciseListVisible);
  };

  const updateSelectedExercises = selectedExercises => {
    Exercises.push(...selectedExercises);
  };

  const onFinishPress = async () => {
    const baseUrl = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    try {
      const user = JSON.parse(await AsyncStorage.getItem('userid'));

      const newSet = Object.keys(exerciseSets).reduce((acc, key) => {
        acc[key] = exerciseSets[key].map(item => {
          const { id, ...rest } = item;
          return rest;
        });
        return acc;
      }, {});
      await fetch(`http://${baseUrl}:8080/workouts/newWorkout/${user}/${JSON.stringify(Exercises)}/${JSON.stringify(newSet)}`, {
        method:'POST',
      })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View>
          <Text style={styles.title}>Workout</Text>
          <CustomButton text="Finish" onPress={onFinishPress} />
          <View style={{padding: 15}}>
            <CustomButton
              text="Add Exercises"
              bgColor="#EBF6FF"
              fgColor="#35A6FF"
              fSize={18}
              onPress={() => {
                setExerciseModalVisible(true);
                toggleExerciseListVisibility();
              }}
            />
          </View>
        </View>
        <ScrollView style={styles.contentContainer}>
          {Exercises.length ? (
            <View style={styles.selectedExercisesContainer}>
              {Exercises.map((exercise, index) => (
                <View key={index}>
                  <Text>{exercise.value}</Text>
                  <SetInput exerciseIndex={index} />
                </View>
              ))}
            </View>
          ) : null}
        </ScrollView>
      </BottomSheet>
      {isExerciseModalVisible && (
        <ExerciseModal
          closeModal={closeExerciseModal}
          updateSelectedExercises={updateSelectedExercises}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    padding: 15,
    paddingBottom: 30,
    fontSize: 28,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  selectedExercisesContainer: {
    margin: 20,
  },
  selectedExercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedExerciseItem: {
    fontSize: 16,
  },
});

export default WorkoutSession;
