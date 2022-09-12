import React, {useCallback, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NavigatorTab} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ChangeUserData = ({route}) => {
  const {userData, attendanceData} = route.params;
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
      // Axios.
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
      <View style={styles.navigatorWrapper}>
        <NavigatorTab date={attendanceData.title} title="Ubah data maba" />
      </View>
      <ScrollView style={styles.bodyWrapper}>
        <Text style={styles.inputTextLabel}>Nama Lengkap</Text>
        <TextInput style={styles.inputText} value={userData.name} />
        <Text style={styles.inputTextLabel}>Kelompok</Text>
        <TextInput
          style={styles.inputText}
          value={userData.group}
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputTextLabel}>Vaksinasi Ke</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#DADADA',
            height: 50,
            borderRadius: 10,
            marginBottom: 20,
            fontFamily: 'Montserrat-Regular',
            fontSize: 14,
            paddingHorizontal: 15,
            width: 50,
          }}
          value={userData.vaccine.count.toString()}
        />
        <Text style={styles.inputTextLabel}>Bukti vaksin</Text>
        <Image
          style={styles.vaccineProof}
          source={{
            uri: userData.vaccine.proof,
          }}
        />
        {/*<View style={{justifyContent: 'center', alignItems: 'center'}}>*/}
        {/*  <Text style={styles.inputTextLabel}>QR Code</Text>*/}
        {/*  <Image*/}
        {/*    style={styles.vaccineProof}*/}
        {/*    source={{*/}
        {/*      uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userData._id}`,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</View>*/}
      </ScrollView>
    </View>
  );
};

export default ChangeUserData;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
  bodyWrapper: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  inputTextLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#DADADA',
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingHorizontal: 15,
  },
  vaccineProof: {
    flex: 1,
    width: 150,
    height: 150,
  },
});
