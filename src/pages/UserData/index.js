import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Loading,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
  UserCard,
} from '../../components';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {showToast} from '../../utils';

const UserData = ({route}) => {
  const {groupName} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
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
      Axios.post(`${API_HOST.url}/student/all/from/group`, {group: groupName})
        .then(r => {
          setData(r.data.data);
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          showToast(`Error: ${e}`, 'danger');
        });

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
            title={groupName}
            navigateTo="Dashboard"
          />
        </View>
        <View style={styles.searchSection}>
          <TextInputComponent
            type="username"
            isPasswordInput={false}
            placeholder="Cari nama anggota"
          />
          <SearchButton />
        </View>
        <ScrollView style={styles.collectionWrapper}>
          {data.map(item => (
            <UserCard
              groupName={item.group}
              name={item.name}
              vaccineCount={item.vaccine.count}
              id={item._id}
              key={item._id}
            />
          ))}
        </ScrollView>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default UserData;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  collectionWrapper: {
    flex: 1,
    paddingTop: 5,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
});
