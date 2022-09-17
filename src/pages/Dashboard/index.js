import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraPicker,
  CardMenu,
  Loading,
  NavigatorTab,
  StatusCount,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {generateError, getData, removeItem, showToast} from '../../utils';
import Axios from 'axios';
import {API_HOST} from '../../config';

const Dashboard = ({route}) => {
  const {attendanceData} = route.params;
  const navigation = useNavigation();
  const [isCameraPick, setIsCameraPick] = useState(false);
  const [accountData, setAccountData] = useState({});
  const [countStatus, setCountStatus] = useState({
    hadir: 0,
    izin: 0,
    sakit: 0,
    alpa: 0,
  });
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
      getData('user')
        .then(r => {
          setAccountData(r);
          Axios.get(
            `${API_HOST.url}/attendance/count-status/${attendanceData._id}`,
            {
              headers: {
                Authorization: `Bearer ${r.token}`,
              },
            },
          )
            .then(item => {
              setCountStatus(item.data.data);
              setIsLoading(false);
            })
            .catch(e => {
              setIsLoading(false);
              generateError(e, navigation);
            });
        })
        .catch(e => {
          setIsLoading(false);
          navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
          showToast('Gagal mendapatkan data akun!', 'danger');
        });
    }, []),
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onLogout = () => {
    removeItem('user').then(() =>
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]}),
    );
  };

  return (
    <>
      <ScrollView style={styles.wrapper}>
        <View style={styles.redBox} onLayout={onLayoutRootView}>
          <View style={styles.header}>
            <NavigatorTab
              date={attendanceData.title}
              title="PKKMB 2022"
              isWhiteColor={true}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={onLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statusCountWrapper}>
            <StatusCount count={countStatus.hadir} title={'Hadir'} />
            <StatusCount count={countStatus.izin} title={'Izin'} />
            <StatusCount count={countStatus.sakit} title={'Sakit'} />
            <StatusCount count={countStatus.alpa} title={'Alpa'} />
          </View>
        </View>
        <View style={styles.cards}>
          <CardMenu
            title="Datang"
            type="datang"
            onPress={() =>
              navigation.navigate('ScanIn', {
                attendanceData,
                accountData,
              })
            }
          />
          <CardMenu
            title="Pulang"
            type="pulang"
            onPress={() =>
              navigation.navigate('ScanOut', {
                attendanceData,
                accountData,
              })
            }
          />
          <CardMenu
            title="Manual"
            type="manual"
            onPress={() =>
              navigation.navigate('Manual', {
                attendanceData,
                accountData,
              })
            }
          />
          {accountData.accountType === 'Master' && (
            <>
              <CardMenu
                title="Data Maba"
                type="data-maba"
                onPress={() =>
                  navigation.navigate('UserGroupData', {
                    attendanceData,
                    accountData,
                  })
                }
              />
              <CardMenu
                title="Add kafas"
                type="create-user"
                onPress={() =>
                  navigation.navigate('AddUser', {
                    attendanceData,
                    accountData,
                  })
                }
              />
            </>
          )}
          <CardMenu
            title="Histori"
            type="histori"
            onPress={() =>
              navigation.navigate('History', {
                attendanceData,
                accountData,
              })
            }
          />
        </View>
      </ScrollView>
      {isLoading && <Loading />}
      {isCameraPick && (
        <CameraPicker
          attendanceData={attendanceData}
          accountData={accountData}
        />
      )}
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redBox: {
    paddingHorizontal: 15,
    paddingTop: 25,
    backgroundColor: '#BC011E',
    height: 238,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitle: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginRight: 5,
  },
  dropdownItemText: {
    color: '#DADADA',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    marginVertical: 3,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F7AD48',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 5,
    height: 27,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  statusCountWrapper: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 50,
  },
  dropdownItem: {
    marginTop: 20,
    position: 'absolute',
    backgroundColor: '#BC011E',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
