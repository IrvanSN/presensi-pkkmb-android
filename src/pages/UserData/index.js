import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  NavigatorTab,
  SearchButton,
  TextInputComponent,
  UserCard,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const UserData = () => {
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
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <View style={styles.navigatorWrapper}>
        <NavigatorTab
          date="Selasa, 27 September"
          title="Data Maba"
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
        <UserCard groupName="1. SOETOMO" memberCount={35} />
        <View style={styles.gap} />
        <UserCard groupName="2. SOEKARNO" memberCount={41} />
        <View style={styles.gap} />
        <UserCard groupName="3. MOH. HATTA" memberCount={42} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={styles.gap} />
      </ScrollView>
    </View>
  );
};

export default UserData;

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
    paddingTop: 5,
  },
  gap: {marginTop: 28},
});
