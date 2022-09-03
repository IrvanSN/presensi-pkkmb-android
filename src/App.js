import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import * as React from 'react';
import Router from './router';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
