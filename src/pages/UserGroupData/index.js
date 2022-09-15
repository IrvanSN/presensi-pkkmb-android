import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Loading,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
  UserGroupCard,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {showToast} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const UserGroupData = ({route}) => {
  const navigation = useNavigation();
  const {attendanceData} = route.params;
  const [data, setData] = useState([]);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [dataMatch, setDataMatch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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

  useFocusEffect(
    useCallback(() => {
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
    }, []),
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && data.length === 0) {
    return null;
  }

  const onSubmit = () => {
    setIsClickSearchButton(true);
    const regex = new RegExp(`${searchInput}`, 'i');
    const matchData = data.filter(item => item.groupName.match(regex));
    setDataMatch(matchData);

    if (searchInput === '') {
      setIsClickSearchButton(false);
    }
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title="Data Kelompok" />
        </View>
        <View style={styles.searchSection}>
          <TextInputComponent
            type="username"
            isPasswordInput={false}
            placeholder="Cari nama kelompok"
            value={searchInput}
            onChangeText={value => setSearchInput(value)}
          />
          <SearchButton onPress={onSubmit} />
        </View>
        <ScrollView>
          <View
            style={{backgroundColor: 'rgba(255, 0, 0, 0)', marginVertical: 7.5}}
          />
          {isClickSearchButton
            ? dataMatch.map(item => (
                <View key={item.groupId}>
                  <UserGroupCard
                    groupName={item.groupName}
                    memberCount={item.total}
                    onPressMore={() =>
                      navigation.navigate('UserData', {
                        attendanceData,
                        groupName: item.groupName,
                        groupData: data,
                      })
                    }
                  />
                  <View style={styles.gap} />
                </View>
              ))
            : data.map(item => (
                <View key={item.groupId}>
                  <UserGroupCard
                    groupName={item.groupName}
                    memberCount={item.total}
                    onPressMore={() =>
                      navigation.navigate('UserData', {
                        attendanceData,
                        groupName: item.groupName,
                        groupData: data,
                      })
                    }
                  />
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
  buttonWrapper: {
    marginHorizontal: 15,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  gap: {marginTop: 28},
});
