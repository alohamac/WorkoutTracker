import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import HomeScreen from '../screens/homeScreen';
import ExercisesScreen from '../screens/exercisesScreen';
import StartWorkoutScreen from '../screens/startWorkoutScreen';
import HistoryScreen from '../screens/historyScreen';

const homeName = 'Home';
const exercisesName = 'Exercises';
const startWorkoutName = 'Start Workout';
const historyName = 'History';

const Tab = createBottomTabNavigator();
const NavigationTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          let rn = route.name;
          if (rn === homeName) {
            iconName = 'home';
          } else if (rn === exercisesName) {
            iconName = 'barbell-outline';
          } else if (rn === startWorkoutName) {
            iconName = 'add';
          } else if (rn === historyName) {
            iconName = 'time';
          }
          color = focused ? 'blue' : 'gray';
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={36} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {fontSize: 12},
      })}
      >
      {/* <Tab.Navigator tabBar={props => <MyTabBar {...props} />}> */}
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen
        name={startWorkoutName}
        component={StartWorkoutScreen}
        initialParams={{id: 123}}
      />
      <Tab.Screen name={exercisesName} component={ExercisesScreen} />
      <Tab.Screen name={historyName} component={HistoryScreen} />
    </Tab.Navigator>
  );
};
export default NavigationTabs;
