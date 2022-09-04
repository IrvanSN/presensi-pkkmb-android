import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import FlashMessage from 'react-native-flash-message';
import Router from './src/router';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;
