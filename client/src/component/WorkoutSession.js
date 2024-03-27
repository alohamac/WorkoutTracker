import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';
import {ScrollView} from 'react-native-gesture-handler';
import {produce} from 'immer';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
        draftExercises[exerciseIndex].sets.push({id: Date.now(), reps: 0, weight: 0});
      }),
    );
  };
  
  const onDeleteSetPress = (exerciseIndex, setId) => {
    setExercises(
      produce(Exercises, draftExercises => {
        const sets = draftExercises[exerciseIndex].sets;
        const setIndex = sets.findIndex(set => set.id === setId);
        if (setIndex !== -1) {
          sets.splice(setIndex, 1);
        }
      }),
    );
  };
  
  

  const handleRepChange = (exerciseIndex, setIndex, text) => {
    setExercises(
      produce(Exercises, draftExercises => {
        draftExercises[exerciseIndex].sets[setIndex].reps = text;
      }),
    );
  };

  const handleWeightChange = (exerciseIndex, setIndex, text) => {
    setExercises(
      produce(Exercises, draftExercises => {
        draftExercises[exerciseIndex].sets[setIndex].weight = text;
      }),
    );
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
                      {exercise.sets.map((set, setIndex) => (
                        <View
                          key={set.id}
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{flex: 0.25}}>{setIndex + 1}</Text>
                          <TextInput
                            style={styles.setInput}
                            placeholder={'Reps'}
                            keyboardType="numeric"
                            onChangeText={text =>
                              handleRepChange(exerciseIndex, setIndex, text)
                            }
                          />
                          <TextInput
                            style={styles.setInput}
                            placeholder={'Weight'}
                            keyboardType="numeric"
                            onChangeText={text =>
                              handleWeightChange(exerciseIndex, setIndex, text)
                            }
                          />
                          <Ionicons
                            name="trash-outline"
                            size={30}
                            color="red"
                            onPress={()=>onDeleteSetPress(exerciseIndex, set.id)}
                          />
                        </View>
                      ))}
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
    // width: 100,
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    // padding: 5,
    textAlign: 'center',
    flex: 1,
  },
});

export default WorkoutSession;
