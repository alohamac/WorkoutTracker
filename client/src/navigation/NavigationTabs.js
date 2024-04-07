import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';

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
const tabBarHeight = Dimensions.get('window').height * 0.09;

const NavigationTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      sceneContainerStyle={{paddingBottom: 200}}
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
        tabBarStyle: {height: tabBarHeight, borderColor: 'gray'}
      }
      )}
      >
    {/* <Tab.Navigator tabBar={props => <MyTabBar {...props} />}> */}
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={startWorkoutName} component={StartWorkoutScreen} />
      <Tab.Screen name={exercisesName} component={ExercisesScreen} />
      <Tab.Screen name={historyName} component={HistoryScreen} />
    </Tab.Navigator>
  );
};
export default NavigationTabs;
