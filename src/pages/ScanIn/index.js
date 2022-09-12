import React, {useCallback, useEffect, useState} from 'react';
import {Loading, NavigatorTab} from '../../components';
import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const ScanIn = ({route}) => {
  const {attendanceData, accountData} = route.params;
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
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
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
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
      assigneeId: accountData.user._id,
      status: 'Hadir',
    };

    Axios.post(`${API_HOST.url}/transaction/in`, payload)
      .then(r => {
        setIsLoading(false);
        showToast(
          `Absensi Datang, ${r.data.data.student.name} berhasil!`,
          'success',
        );
      })
      .catch(e => {
        setIsLoading(false);
        showToast('Gagal melakukan absensi!', 'danger');
      });
  };

  if (!fontsLoaded) {
    return null;
  }
  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    Linking.openSettings();
    return navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
  }

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title="Absensi Datang" />
        </View>
        <View style={styles.scannerBox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scanner}
          />
        </View>
        <View style={styles.footerScanner}>
          {scanned ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonReScan}
              onPress={() => setScanned(false)}>
              <Text style={styles.reScanText}>Scan Ulang</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonReScanDisabled}
              onPress={() => setScanned(false)}>
              <Text style={styles.reScanTextDisabled}>Scanning..</Text>
            </TouchableOpacity>
          )}
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
  scanner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  scannerBox: {
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginBottom: 25,
    overflow: 'hidden',
  },
  footerScanner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonReScan: {
    backgroundColor: '#BC011E',
    width: 130,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 30,
  },
  buttonReScanDisabled: {
    backgroundColor: 'white',
    width: 130,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#87898E',
    marginBottom: 30,
  },
  reScanText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  reScanTextDisabled: {
    color: '#87898E',
    fontFamily: 'Montserrat-SemiBold',
  },
});
