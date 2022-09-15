import React, {useCallback, useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {API_HOST} from '../../config';
import {
  ActionButton,
  Loading,
  NavigatorTab,
  TextInputComponent,
} from '../../components';
import Axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import {ScrollView, StyleSheet, View} from 'react-native';
import {generateError, showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const AddUser = ({route}) => {
  const navigation = useNavigation();
  const {attendanceData, accountData} = route.params;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onSubmit = () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setPassword('');
      setConfirmPassword('');
      return showToast('Passsword yang anda masukkan tidak sama!', 'danger');
    }

    if (!(password && confirmPassword)) {
      setIsLoading(false);
      return showToast('Lengkapi semua form!', 'danger');
    }

    const data = {
      name,
      username,
      password,
    };

    Axios.post(`${API_HOST.url}/kafas/add`, data, {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    })
      .then(r => {
        setIsLoading(false);
        showToast(
          `Berhasil membuat akun kafas ${r.data.data.username}!`,
          'success',
        );
        navigation.goBack();
      })
      .catch(e => {
        setIsLoading(false);
        generateError(e, navigation);
      });

    setName('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title="Add kafas" />
        </View>
        <ScrollView>
          <View style={styles.formWrapper}>
            <TextInputComponent
              placeholder="Masukkan Nama"
              isPasswordInput={false}
              type="username"
              value={name}
              onChangeText={value => setName(value)}
            />
            <View style={{marginTop: 18}} />
            <TextInputComponent
              placeholder="Masukkan Username"
              isPasswordInput={false}
              type="username"
              value={username}
              onChangeText={value => setUsername(value)}
            />
            <View style={{marginTop: 18}} />
            <TextInputComponent
              placeholder="Masukkan Password"
              isPasswordInput={true}
              type="password"
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <View style={{marginTop: 18}} />
            <TextInputComponent
              placeholder="Konfirmasi Password"
              isPasswordInput={true}
              type="password"
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
            />
          </View>
        </ScrollView>
        <ActionButton
          onPress={onSubmit}
          title="Tambah"
          addButtonStyles={{position: 'absolute'}}
        />
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 15,
  },
  scrollViewStyle: {
    marginBottom: 70,
  },
  formWrapper: {
    flex: 1,
    marginTop: 20,
  },
});
