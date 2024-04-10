import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Stopwatch from '../component/Stopwatch';

const HistoryScreen = () => {
  return (
    <View style={styles.root}>
      <Stopwatch/>      
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    fontFamily: 'Helvetica Pro Textbook',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Add extra padding for iOS devices with notche
    flex: 1,
  },
  boldText: {
    fontSize: 30,
    fontWeight: 'bold',
    alignItems: 'baseline',
  },
});

export default HistoryScreen;
