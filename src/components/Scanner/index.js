import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showToast} from '../../utils';
import React, {useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {ChevronLeft, ChevronRight} from '../../assets/icon';
import {API_HOST} from '../../config';
import Axios from 'axios';
import Loading from '../Loading';

const ScanIn = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
  });

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

    if (props.type === 'scannerIn') {
      const payload = {
        studentId: data,
        attendanceId: '6305d50b6f4a82e0e52e9204',
        kafasId: '6305c468d641cbbb23f5d511',
        status: 'Hadir',
      };

      Axios.post(`${API_HOST.url}/transaction/in`, payload)
        .then(r => {
          setIsLoading(false);
          showToast(
            `Absensi Masuk, ${r.data.data.student.name} berhasil!`,
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
        attendanceId: '6305d50b6f4a82e0e52e9204',
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
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} style={styles.circleChevron}>
            <ChevronLeft />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.subTitleText}>Selasa, 27 September</Text>
            <Text style={styles.titleText}>
              {props.type === 'scannerIn' ? 'Absensi Masuk' : 'Absensi Pulang'}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.circleChevron}>
            <ChevronRight />
          </TouchableOpacity>
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
    flex: 1,
    backgroundColor: 'rgba(45,45,45,0.35)',
  },
  header: {
    height: 100,
    paddingHorizontal: 34,
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 130,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#BC011E',
    marginBottom: 30,
  },
  reScanText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
  },
  reScanTextDisabled: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
  },
});
