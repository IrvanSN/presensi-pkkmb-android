import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Dashboard, ScanIn, ScanOut, SignIn, SplashScreen} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="ScanIn"
            component={ScanIn}
            options={{headerShown: false}}
        />
        <Stack.Screen
            name="ScanOut"
            component={ScanOut}
            options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
};

export default Router;