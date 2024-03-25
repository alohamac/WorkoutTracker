import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';
import {ScrollView} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import { produce } from 'immer';
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

  const onAddSetPress = exerciseIndex => {
    setExercises(
      produce(Exercises, draftExercises => {
        draftExercises[exerciseIndex].sets.push({reps: 0, weight: 0});
      })
    )
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
          {/*renders each selected exercise*/}
          {Exercises.length ? (
            <View style={styles.selectedExercisesContainer}>
              {/*Renders each set of an exercises*/}
              {Exercises.map((exercise, exerciseIndex) => (
                <View key={exerciseIndex}>
                  {exercise.sets.length ? (
                    <View>
                      <Text>{exercise.value}</Text>
                      <DataTable>
                        <DataTable.Header>
                          <DataTable.Title numeric>Set</DataTable.Title>
                          <DataTable.Title numeric>Reps</DataTable.Title>
                          <DataTable.Title numeric>Weight</DataTable.Title>
                        </DataTable.Header>
                        {exercise.sets.map((set, setIndex) => (
                          <View key={setIndex}>
                            <DataTable.Row>
                              <DataTable.Cell>{setIndex + 1}</DataTable.Cell>
                              <DataTable.Cell>
                                <TextInput
                                  style={styles.setInput}
                                  placeholder={String(set.reps)}
                                  keyboardType="numeric"
                                  value={Exercises[exerciseIndex][setIndex]}
                                  // onChangeText={text =>
                                  //   handleWeightChange(text, index)
                                  // }
                                />
                              </DataTable.Cell>
                              <DataTable.Cell>
                                <TextInput
                                  style={styles.setInput}
                                  placeholder={String(set.weight)}
                                  keyboardType="numeric"
                                  value={Exercises[exerciseIndex][setIndex]}
                                  // onChangeText={text =>
                                  //   handleWeightChange(text, index)
                                  // }
                                />
                              </DataTable.Cell>
                            </DataTable.Row>
                            {/* <TextInput
                            style={styles.setInput}
                            placeholder={String(set.reps)}
                            keyboardType="numeric"
                            value={Exercises[exerciseIndex][setIndex]}
                            // onChangeText={text =>
                            //   handleWeightChange(text, index)
                            // }
                          /> */}
                          </View>
                        ))}
                      </DataTable>
                      <Button
                        title="Add Set"
                        onPress={() => onAddSetPress(exerciseIndex)}
                      />
                    </View>
                  ) : null}
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
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setInput: {
    width: 100,
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
});

export default WorkoutSession;
