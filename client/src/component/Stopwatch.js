/*Used code from https://www.geeksforgeeks.org/create-a-stop-watch-using-react-native/ */

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {Text, StyleSheet} from 'react-native';

const Stopwatch = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  const startStopwatch = () => {
    startTimeRef.current = Date.now() - time * 1000;
    intervalRef.current = setInterval(() => {
      setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    setRunning(true);
  };

  const pauseStopwatch = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  useImperativeHandle(ref, () => ({
    startStopwatch,
    pauseStopwatch,
  }));

  // Format time to HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return (
      String(hours).padStart(2, '0') +
      ':' +
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    );
  };

  return <Text style={styles.timeText}>{formatTime()}</Text>;
});

const styles = StyleSheet.create({
  timeText: {
    fontSize: 20,
  },
});

export default Stopwatch;
