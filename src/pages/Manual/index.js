import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  BasicButton,
  Loading,
  ManualCard,
  NavigatorTab,
  SearchButton,
  TextInputComponent,
} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {getData, showToast} from '../../utils';

const Manual = ({route}) => {
  const {attendanceId} = route.params;
  const [attendanceType, setAttendanceType] = useState('Datang');
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
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
      getData('user').then(r => {
        setUser(r.user);
      });

      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onAttendanceIn = () => {
    Axios.get(
      `${API_HOST.url}/student/${searchInput}/from/attendance/${attendanceId}`,
    )
      .then(r => {
        setData(r.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        showToast('Gagal mendapatkan data!', 'danger');
      });
  };

  const onAttendanceOut = () => {
    Axios.get(
      `${API_HOST.url}/transaction/from/student/${searchInput}/attendance/${attendanceId}`,
    )
      .then(r => {
        setData(r.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        showToast('Gagal mendapatkan data!', 'danger');
      });
  };

  const onSubmit = () => {
    setIsLoading(true);
    if (searchInput) {
      if (attendanceType === 'Datang') {
        onAttendanceIn();
      } else if (attendanceType === 'Pulang') {
        onAttendanceOut();
      } else {
        setIsLoading(false);
        showToast('Gagal mendapatkan data!', 'danger');
      }
    } else {
      setIsLoading(false);
      showToast('Gagal mendapatkan data!', 'danger');
    }
  };
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
        <View style={styles.searchSection}>
          <TextInputComponent
            type="username"
            isPasswordInput={false}
            placeholder="Cari dengan nama"
            value={searchInput}
            onChangeText={value => setSearchInput(value)}
          />
          <SearchButton onPress={onSubmit} />
        </View>
        <View style={styles.attendanceType}>
          <BasicButton
            text="Datang"
            isActive={attendanceType === 'Datang'}
            onPress={() => {
              setAttendanceType('Datang');
              setData([]);
            }}
          />
          <BasicButton
            text="Pulang"
            isActive={attendanceType === 'Pulang'}
            onPress={() => {
              setAttendanceType('Pulang');
              setData([]);
            }}
          />
        </View>
        <ScrollView style={styles.collectionWrapper}>
          {data.map(item => (
            <View key={item.student._id}>
              <ManualCard
                name={item.student.name}
                group={item.student.group}
                vaccineCount={item.student.vaccine.count}
                studentId={item.student._id}
                assigneeId={user._id}
                attendanceId={attendanceId}
                transaction={item.transaction[0]}
                attendanceType={attendanceType}
              />
              <View style={{marginTop: 28}} />
            </View>
          ))}
        </ScrollView>
      </View>
      {isLoading && <Loading />}
    </>
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
  attendanceType: {
    borderColor: '#DADADA',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 15,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  collectionWrapper: {
    paddingTop: 5,
  },
  gap: {marginTop: 28},
});
