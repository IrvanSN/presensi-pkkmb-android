import React, {useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {getData} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const SplashScreenPage = () => {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        getData('token').then(async r => {
          if (r) {
            setAppIsReady(true);
            await SplashScreen.hideAsync();
            navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
          } else {
            setAppIsReady(true);
            await SplashScreen.hideAsync();
            navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
          }
        });
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return <></>;
};

export default SplashScreenPage;
