import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomButton from '../component/CustomButton';

const StartWorkoutScreen = ({setWorkoutVisibility}) => {
  return (
    <View style={styles.root}>
      <CustomButton text="Start Workout" onPress={()=>{setWorkoutVisibility(true)}}/>
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
