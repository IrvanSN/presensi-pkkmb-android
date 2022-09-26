import React, {useCallback, useEffect, useState} from 'react';
import {Loading, NavigatorTab} from '../../components';
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {generateError, showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {Camera, CameraType} from 'expo-camera';

const ScanIn = ({route}) => {
  const {attendanceData, accountData} = route.params;
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
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
      requestPermission();
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    setIsLoading(true);

    const payload = {
      studentId: data,
      attendanceId: attendanceData._id,
    };

    Axios.put(`${API_HOST.url}/transaction/out`, payload, {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    })
      .then(r => {
        setIsLoading(false);
        showToast(
          `Absensi Pulang, ${r.data.data.student.name} berhasil!`,
          'success',
        );
      })
      .catch(e => {
        setIsLoading(false);
        generateError(e, navigation);
      });

    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  if (!fontsLoaded) {
    return null;
  }
  if (!permission) {
    return null;
  }
  if (!permission.granted) {
    Linking.openSettings();
    return navigation.goBack();
  }

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title="Absensi Pulang" />
        </View>
        <View style={styles.scannerBox}>
          <Camera
            type={type}
            ratio="16:9"
            style={{
              height: height,
              width: '100%',
            }}
            onBarCodeScanned={scanned ? null : handleBarCodeScanned}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: type === CameraType.front ? '#BC011E' : 'white',
              borderColor: type === CameraType.front ? '' : '#87898E',
              borderWidth: type === CameraType.front ? 0 : 1,
              ...styles.buttonSelectCamera,
            }}
            onPress={() => setType(CameraType.front)}>
            <Text
              style={{
                color: type === CameraType.front ? 'white' : '#87898E',
                ...styles.textButton,
              }}>
              Kamera Depan
            </Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 5}} />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: type === CameraType.back ? '#BC011E' : 'white',
              borderColor: type === CameraType.back ? '' : '#87898E',
              borderWidth: type === CameraType.back ? 0 : 1,
              ...styles.buttonSelectCamera,
            }}
            onPress={() => setType(CameraType.back)}>
            <Text
              style={{
                color: type === CameraType.back ? 'white' : '#87898E',
                ...styles.textButton,
              }}>
              Kamera Belakang
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default ScanIn;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  scannerBox: {
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 210,
    marginBottom: 25,
    overflow: 'hidden',
  },
  buttonSelectCamera: {
    flex: 1,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  textButton: {
    fontFamily: 'Montserrat-Regular',
  },
});
