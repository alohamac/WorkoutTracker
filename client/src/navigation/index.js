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
                  iconName = focused ? 'home' : 'home-outline';

                } else if (rn === exercisesName) {
                  iconName = focused ? 'list' : 'list-outline';

                } else if (rn === startWorkoutName) {
                  iconName = focused ? 'settings' : 'settings-outline';
                }
                
                // You can return any component that you like here!
                return <Ionicons name={'home'} size={size} color={color} />;
              },
              
            },{
              "tabBarActiveTintColor": "#2499ff",
              "tabBarInactiveTintColor": "grey",
              "tabBarLabelStyle": {
                "paddingBottom": 10,
                "fontSize": 14
              },
              "tabBarStyle": [
                {
                  "display": "flex"
                },
                null
              ]
            }
            )}>

          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={startWorkoutName} component={StartWorkoutScreen} />
          <Tab.Screen name={exercisesName} component={ExercisesScreen} />
          <Tab.Screen name={historyName} component={HistoryScreen} />
        </Tab.Navigator>
          {/* <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} /> 
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
            <Stack.Screen name="StartWorkout" component={StartWorkoutScreen} />
            <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
          </Stack.Navigator> */}
          
      </NavigationContainer>
);
}
export default Navigation;