import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import LoginScreen from '../screens/logInScreen';
import HomeScreen from '../screens/homeScreen';
import ExercisesScreen from '../screens/exercisesScreen';
import StartWorkoutScreen from '../screens/startWorkoutScreen';
import HistoryScreen from '../screens/historyScreen';

const homeName = 'Home';
const exercisesName = 'Exercises';
const startWorkoutName = 'Start Workout';
const historyName = 'History';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
            <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
          </Stack.Navigator> */}
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
        })}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={startWorkoutName} component={StartWorkoutScreen} />
        <Tab.Screen name={exercisesName} component={ExercisesScreen} />
        <Tab.Screen name={historyName} component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
