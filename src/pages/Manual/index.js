import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  ManualCard,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const Manual = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
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
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <View style={styles.navigatorWrapper}>
        <NavigatorTab
          date="Selasa, 27 September"
          title="Presensi Manual"
          navigateTo="Dashboard"
        />
      </View>
      <View style={styles.searchSection}>
        <TextInputComponent
          type="username"
          isPasswordInput={false}
          placeholder="Cari dengan nama"
        />
        <SearchButton />
      </View>
      <ScrollView style={styles.collectionWrapper}>
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard
          name="John Ahmad"
          groupName="2. SOEKARNO"
          vaccineCount={3}
        />
        <View style={{marginTop: 28}} />
        <ManualCard
          name="John Subekti"
          groupName="1. SOETOMO"
          vaccineCount={3}
        />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={1} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={2} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={styles.gap} />
      </ScrollView>
    </View>
  );
};

export default Manual;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  collectionWrapper: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  gap: {marginTop: 28},
});
