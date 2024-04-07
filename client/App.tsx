import React, { useState } from 'react';
import Navigation from './src/navigation/StackNavigation';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PortalProvider, PortalHost} from '@gorhom/portal';
import WorkoutSession from './src/component/WorkoutSession';

function App(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PortalProvider>
        <SafeAreaView style={styles.root}>
          <Navigation />
          {isVisible && (
            <>
            <PortalHost name='Workout'/>
            <WorkoutSession/>
            </>
          )}
        </SafeAreaView>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
