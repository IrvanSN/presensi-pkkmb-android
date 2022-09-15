import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  ActionButton,
  Loading,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
  UserCard,
} from '../../components';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {showToast} from '../../utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const UserData = ({route}) => {
  const {groupData, attendanceData, groupName} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isClickSearchButton, setIsClickSearchButton] = useState(false);
  const [dataMatch, setDataMatch] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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
      Axios.post(`${API_HOST.url}/student/all/from/group`, {group: groupName})
        .then(r => {
          setData(r.data.data);
          setIsLoading(false);
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
    const matchData = data.filter(item => item.name.match(regex));
    setDataMatch(matchData);

    if (searchInput === '') {
      setIsClickSearchButton(false);
    }
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title={groupName} />
        </View>
        <View style={styles.searchSection}>
          <TextInputComponent
            type="username"
            isPasswordInput={false}
            placeholder="Cari nama anggota"
            value={searchInput}
            onChangeText={value => setSearchInput(value)}
          />
          <SearchButton onPress={onSubmit} />
        </View>
        <ScrollView style={styles.collectionWrapper}>
          {isClickSearchButton
            ? dataMatch.map(item => (
                <UserCard
                  groupName={item.group}
                  name={item.name}
                  vaccineCount={item.vaccine.count}
                  id={item._id}
                  key={item._id}
                  onPressChangeData={() =>
                    navigation.navigate('DetailUserData', {
                      userData: item,
                      attendanceData,
                      groupData,
                      type: 'updateData',
                    })
                  }
                />
              ))
            : data.map(item => (
                <UserCard
                  groupName={item.group}
                  name={item.name}
                  vaccineCount={item.vaccine.count}
                  id={item._id}
                  key={item._id}
                  onPressChangeData={() =>
                    navigation.navigate('DetailUserData', {
                      userData: item,
                      attendanceData,
                      groupData,
                      type: 'updateData',
                    })
                  }
                />
              ))}
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <ActionButton
            onPress={() =>
              navigation.navigate('DetailUserData', {
                attendanceData,
                groupData,
                userData: {
                  _id: '',
                  name: '',
                  group: groupName,
                  vaccine: {count: 0, proof: ''},
                },
                type: 'addData',
              })
            }
            title="Tambah Maba"
            addButtonStyles={{position: 'absolute'}}
          />
        </View>
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
  buttonWrapper: {
    marginHorizontal: 15,
  },
  collectionWrapper: {
    flex: 1,
    paddingTop: 5,
    marginBottom: 70,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
});
