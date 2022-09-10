import React, {useCallback, useEffect} from 'react';
import {useFonts} from 'expo-font';
import {NavigatorTab} from '../../components';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from 'react-native';

const History = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab
            date="Selasa, 27 September"
            title="Presensi Manual"
            navigateTo="Dashboard"
          />
        </View>
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
});
