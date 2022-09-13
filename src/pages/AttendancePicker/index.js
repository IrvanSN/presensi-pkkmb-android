import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {MadeByCoder} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';
import {Loading} from '../../components';
import {showToast} from '../../utils';
import Axios from 'axios';
import {API_HOST} from '../../config';

const AttendancePicker = () => {
  const navigation = useNavigation();
  const [dataAttendance, setDataAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    setIsLoading(true);

    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      Axios.get(`${API_HOST.url}/attendance/all`)
        .then(item => {
          setDataAttendance(item.data.data);
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          showToast('Error from API', 'danger');
        });
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
      <ScrollView style={styles.scrollViewStyles}>
        <View style={styles.wrapperImage}>
          <Image
            style={styles.logoVerticalStyles}
            source={require('../../assets/logo/LogoVertical.png')}
          />
        </View>
        <View style={styles.attendanceList}>
          {dataAttendance.map(item => (
            <TouchableOpacity
              key={item._id}
              activeOpacity={0.7}
              style={styles.button}
              onPress={() =>
                navigation.navigate('Dashboard', {
                  attendanceData: item,
                })
              }>
              <Text style={styles.attendanceTitleText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.footer}>
          <MadeByCoder />
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default AttendancePicker;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollViewStyles: {
    paddingTop: 30,
  },
  wrapperImage: {
    alignItems: 'center',
  },
  logoVerticalStyles: {
    marginTop: 30,
    width: 173,
    height: 282,
  },
  attendanceList: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceTitleText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 215,
    paddingVertical: 18,
    backgroundColor: 'white',
    borderColor: '#E6E6E6',
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 10,
  },
  footer: {
    marginTop: 138,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
});
