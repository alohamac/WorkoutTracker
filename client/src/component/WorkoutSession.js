import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';
import SetInput from './SetInput';
import {ScrollView} from 'react-native-gesture-handler';

const WorkoutSession = () => {
  const bottomSheetRef = useRef(null);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [Exercises, setExercises] = useState([]);

  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);

  const handleSheetChanges = useCallback(index => {}, []);

  const closeExerciseModal = () => {
    setExerciseModalVisible(false);
  };

  const toggleExerciseListVisibility = () => {
    setIsExerciseListVisible(!isExerciseListVisible);
  };

  const updateSelectedExercises = selectedExercises => {
    Exercises.push(...selectedExercises);
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
                  <SetInput />
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
