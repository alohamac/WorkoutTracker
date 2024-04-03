import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import CustomButton from './CustomButton';
import ExerciseModal from './AddExerciseWorkout';
import FinishWorkoutConfirmation from './FinishWorkoutConfirmation';
import Stopwatch from './Stopwatch';
import {ScrollView} from 'react-native-gesture-handler';
import {produce} from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WorkoutSession = () => {
  const bottomSheetRef = useRef(null);
  const [isExerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState('Workout');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [exercises, setExercises] = useState([]);
  const [emptySets, setEmptySets] = useState([]);
  const stopwatchRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '75%', '100%'], []);

  const handleSheetChanges = useCallback(index => {}, []);

  const closeExerciseModal = () => {
    setExerciseModalVisible(false);
  };

  const toggleExerciseListVisibility = () => {
    setIsExerciseListVisible(!isExerciseListVisible);
  };

  const updateSelectedExercises = selectedExercises => {
    setExercises(prevExercises => [...prevExercises, ...selectedExercises]);
  };

  const onDeleteExercisePress = exerciseKey => {
    setExercises(
      produce(exercises, draftExercises => {
        const exerciseIndex = draftExercises.findIndex(
          exercise => exercise.key === exerciseKey,
        );
        if (exerciseIndex !== -1) {
          draftExercises.splice(exerciseIndex, 1);
        }
      }),
    );
  };

  const onAddSetPress = exerciseIndex => {
    setExercises(
      produce(exercises, draftExercises => {
        draftExercises[exerciseIndex].sets.push({
          id: Date.now(),
          reps: '',
          weight: '',
        });
      }),
    );
  };

  const onDeleteSetPress = (exerciseIndex, setId) => {
    setExercises(
      produce(exercises, draftExercises => {
        const sets = draftExercises[exerciseIndex].sets;
        const setIndex = sets.findIndex(set => set.id === setId);
        if (setIndex !== -1) {
          sets.splice(setIndex, 1);
        }
      }),
      console.log("HHH")
    );
  };

  const handleRepChange = (exerciseIndex, setIndex, text) => {
    setExercises(
      produce(exercises, draftExercises => {
        draftExercises[exerciseIndex].sets[setIndex].reps = text;
      }),
    );
  };

  const handleWeightChange = (exerciseIndex, setIndex, text) => {
    setExercises(
      produce(exercises, draftExercises => {
        draftExercises[exerciseIndex].sets[setIndex].weight = text;
      }),
    );
  };

  const setConfirmationVisibility = () => {
    setIsConfirmationVisible(!isConfirmationVisible);
  };

  useEffect(() => {
    setStartTime(Date.now().toString());
    if (stopwatchRef.current) {
      stopwatchRef.current.startStopwatch();
    }
  }, []);

  const completeWorkout = async () => {
    const baseUrl = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
    try {
      const user = JSON.parse(await AsyncStorage.getItem('userid'));
      
      if (exercises.length == 0) {
        throw new Error('No exercises added');
      }

      exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
          if (set.reps === '' || set.weight === '') {
            emptySets.push(set.id);
          }
        });
      });
      if (emptySets.length != 0) {
        throw new Error('set not complete');
      }
      await fetch(
        `http://${baseUrl}:8080/workouts/newWorkout/${user}/${workoutName}/${startTime}/${Date.now().toString()}/${JSON.stringify(
          exercises,
        )}`,
        {
          method: 'POST',
        },
      )
        .then(res => res.json())
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      setIsConfirmationVisible(false);
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
          <View style={styles.rowContainer}>
            <Stopwatch ref={stopwatchRef} />
            <Pressable
              style={styles.finishButton}
              onPress={() => {
                setConfirmationVisibility();
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Finish</Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.title}
            placeholder="Workout"
            onChangeText={text => setWorkoutName(text)}
            value={workoutName}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View>
            {/* TODO: fix styling of custom button */}
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
          {exercises.length ? (
            <View>
              {/*Renders each set of an exercises*/}
              {exercises.map((exercise, exerciseIndex) => (
                <View key={exercise.key}>
                  {exercise.sets.length ? (
                    <View>
                      <View style={{paddingLeft: 15, paddingVertical: 10}}>
                        <Text style={styles.selectedExercisesTitle}>
                          {exercise.value}
                        </Text>
                        <Pressable
                          onPress={()=>onDeleteExercisePress(exercise.key)}>
                          <Ionicons name="ellipsis-horizontal" size={20} />
                        </Pressable>
                      </View>

                      {exercise.sets.map((set, setIndex) => (
                        <View
                          key={set.id}
                          style={[
                            {
                              flexDirection: 'row',
                              alignItems: 'center',
                            },
                            emptySets.includes(set.id)
                              ? {backgroundColor: '#ff9494'}
                              : null,
                            set.reps != '' && set.weight != ''
                              ? {backgroundColor: 'transparent'}
                              : null,
                          ]}>
                          <Text style={{flex: 0.25, textAlign: 'center'}}>
                            {setIndex + 1}
                          </Text>
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
                            style={{flex: 0.25, textAlign: 'center'}}
                            size={30}
                            color="red"
                            onPress={() =>
                              onDeleteSetPress(exerciseIndex, set.id)
                            }
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
      {isConfirmationVisible && (
        <FinishWorkoutConfirmation
          closeModal={setConfirmationVisibility}
          submitWorkout={completeWorkout}
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
    paddingLeft: 15,
    paddingVertical: 30,
    fontSize: 28,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure it takes full width
    paddingHorizontal: 20,
  },
  contentContainer: {
    flex: 1,
  },
  selectedExercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedExerciseItem: {
    fontSize: 16,
    paddingBottom: 20,
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
  finishButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 9,
    paddingVertical: 5,
    backgroundColor: '#2ecd6f',
    borderRadius: 5,
  },
});

export default WorkoutSession;
