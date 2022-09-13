import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  AddUser,
  AttendancePicker,
  Dashboard,
  DetailUserData,
  History,
  Manual,
  ScanIn,
  ScanOut,
  SignIn,
  SplashScreenPage,
  UserData,
  UserGroupData,
} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreenPage"
        component={SplashScreenPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AttendancePicker"
        component={AttendancePicker}
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
      <Stack.Screen
        name="Manual"
        component={Manual}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserGroupData"
        component={UserGroupData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserData"
        component={UserData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailUserData"
        component={DetailUserData}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
