import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationTabs from './NavigationTabs';


const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="LogIn" component={LoginScreen} />  */}
            <Stack.Screen name="Navigation" component={NavigationTabs} /> 
          </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default Navigation;
