import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Loading,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
  UserCard,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {showToast} from '../../utils';

const UserGroupData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      Axios.get(`${API_HOST.url}/student/count/from/group`)
        .then(r => {
          setIsLoading(false);
          setData(r.data.data);
        })
        .catch(e => {
          setIsLoading(false);
          showToast(`Error: ${e}`, 'danger');
        });

      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && data.length === 0) {
    return null;
  }

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab
            date="Selasa, 27 September"
            title="Data Kelompok"
            navigateTo="Dashboard"
          />
        </View>
        <View style={styles.searchSection}>
          <TextInputComponent
            type="username"
            isPasswordInput={false}
            placeholder="Cari nama kelompok"
          />
          <SearchButton />
        </View>
        <ScrollView style={styles.collectionWrapper}>
          {data.map(item => (
            <View key={item.groupId}>
              <UserCard groupName={item.groupName} memberCount={item.total} />
              <View style={styles.gap} />
            </View>
          ))}
        </ScrollView>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default UserGroupData;

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
