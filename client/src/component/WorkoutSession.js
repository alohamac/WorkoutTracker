import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);

  const context = useSharedValue({y: 0});

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -SCREEN_HEIGHT);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3.75) {
        translateY.value = withTiming(-SCREEN_HEIGHT / 3.75);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.25) {
        translateY.value = withTiming(-SCREEN_HEIGHT);
      }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-SCREEN_HEIGHT + 50, -SCREEN_HEIGHT],
      [25, 5],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  useEffect(() => {
    translateY.value = withTiming(-SCREEN_HEIGHT / 3.75);
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.workoutSessionContainer, rBottomSheetStyle]}>
        <View style={styles.line} />

        <Text>Andrew is Gay</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  workoutSessionContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
