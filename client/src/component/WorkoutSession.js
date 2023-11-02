import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';

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
    setExercises([...Exercises, selectedExercises]);
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
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
          {Exercises.length && (
            <View style={styles.selectedExercisesContainer}>
              <Text style={styles.selectedExercisesTitle}>
                Selected Exercises:
              </Text>
              {Exercises.map((exercise, index) => (
                <Text key={index} style={styles.selectedExerciseItem}>
                  {exercise}
                </Text>
              ))}
            </View>
          )}
        </View>
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
