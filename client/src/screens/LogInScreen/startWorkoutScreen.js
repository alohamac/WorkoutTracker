import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../component/CustomButton';
import WorkoutSession from '../../component/WorkoutSession';
import WorkoutSessionProvider from '../../component/WorkoutSessionProvider';

const StartWorkoutScreen = () => {
  const [workout, setWorkout] = useState(true);

  const onStartWorkoutPress = () => {
    setWorkout(true);
  };

  return (
    <View style={styles.root}>
      <CustomButton text="Start Workout" onPress={onStartWorkoutPress} />
      {workout ? (
        <WorkoutSessionProvider>
          <WorkoutSession />
        </WorkoutSessionProvider>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Helvetica Pro Textbook',
    flex: 1,
    // paddingTop: Platform.OS === 'ios' ? 50 : 20, // Add extra padding for iOS devices with notche
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'baseline',
  },
});

export default StartWorkoutScreen;
