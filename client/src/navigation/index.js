import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import LoginScreen from '../screens/LogInScreen/logInScreen';
import HomeScreen from '../screens/LogInScreen/homeScreen';
import ExercisesScreen from '../screens/LogInScreen/exercisesScreen';
import StartWorkoutScreen from '../screens/LogInScreen/startWorkoutScreen';
import HistoryScreen from '../screens/LogInScreen/historyScreen';

const homeName = "Home";
const exercisesName = "Exercises";
const startWorkoutName = "Start Workout";
const historyName = "History";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;
                if (rn === homeName) {
                  iconName = 'home';
                } else if (rn === exercisesName) {
                  iconName = 'barbell-outline';
                } else if (rn === startWorkoutName) {
                  iconName = 'add';
                }
                else if (rn === historyName) {
                  iconName = 'time';
                }
                color = focused ? 'blue' : 'gray';
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={36} color={color}/>;
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              tabBarLabelStyle: {fontSize: 12},

            })}
          >

            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={startWorkoutName} component={StartWorkoutScreen} />
            <Tab.Screen name={exercisesName} component={ExercisesScreen} />
            <Tab.Screen name={historyName} component={HistoryScreen} />
          </Tab.Navigator>
      </NavigationContainer>
);
}
export default Navigation;