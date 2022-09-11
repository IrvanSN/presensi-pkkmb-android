import {
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showToast} from '../../utils';
import React, {useEffect, useState} from 'react';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {API_HOST} from '../../config';
import Axios from 'axios';
import Loading from '../Loading';
import {useNavigation} from '@react-navigation/native';
import {NavigatorTab} from '../index';

const ScanIn = ({type, attendanceData, accountId}) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({data}) => {
    setScanned(true);
    setIsLoading(true);

    if (type === 'scannerIn') {
      const payload = {
        studentId: data,
        attendanceId: attendanceData._id,
        assigneeId: accountId,
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
    } else {
      const payload = {
        studentId: data,
        attendanceId: attendanceData._id,
      };

      Axios.put(`${API_HOST.url}/transaction/out`, payload)
        .then(r => {
          setIsLoading(false);
          showToast(
            `Absensi Pulang, ${r.data.data.student.name} berhasil!`,
            'success',
          );
        })
        .catch(e => {
          setIsLoading(false);
          showToast('Gagal melakukan absensi!', 'danger');
        });
    }
  };

  if (hasPermission === null) {
    return null;
  }
  if (hasPermission === false) {
    Linking.openSettings();
    return navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
  }

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          {/*<TouchableOpacity activeOpacity={0.7} style={styles.circleChevron}>*/}
          {/*  <ChevronLeft />*/}
          {/*</TouchableOpacity>*/}
          {/*<View style={styles.headerText}>*/}
          {/*  <Text style={styles.subTitleText}>Selasa, 27 September</Text>*/}
          {/*  <Text style={styles.titleText}>*/}
          {/*    {type === 'scannerIn' ? 'Absensi Datang' : 'Absensi Pulang'}*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {/*<TouchableOpacity activeOpacity={0.7} style={styles.circleChevron}>*/}
          {/*  <ChevronRight />*/}
          {/*</TouchableOpacity>*/}
          <NavigatorTab
            date={attendanceData.title}
            title={type === 'scannerIn' ? 'Absensi Datang' : 'Absensi Pulang'}
          />
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
  scanner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  wrapper: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 15,
    marginBottom: 30,
    // height: 100,
    // paddingHorizontal: 34,
    // marginTop: 30,
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
  },
  titleText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  subTitleText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  scannerBox: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginBottom: 25,
    overflow: 'hidden',
  },
  circleChevron: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
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
