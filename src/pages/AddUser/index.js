import React, {useCallback, useState, useEffect} from 'react';
import {useFonts} from 'expo-font';
import {API_HOST} from '../../config';
import {
  ActionButton,
  Loading,
  TextInputComponent,
  NavigatorTab,
} from '../../components';
import Axios from 'axios';
import * as SplashScreen from 'expo-splash-screen';
import {ScrollView, StyleSheet, View} from 'react-native';
import {showToast, storeData} from '../../utils';

const AddUser = () => {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
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
    console.log(username, password, confirmPassword);
    setIsLoading(true);
    const data = {
      name,
      username,
      password,
    };

    if (password !== confirmPassword) {
      setIsLoading(false);
      showToast('Passsword yang anda masukkan tidak sama', 'danger');
    }

    if (username && password) {
      Axios.post(`${API_HOST.url}/kafas/add`, data)
        .then(r => {
          setIsLoading(false);
          showToast('${name} Telah Terdaftar', 'success');
        })
        .catch(e => {
          setIsLoading(false);
          showToast(e.response.data.message, 'danger');
        });
    } else {
      setIsLoading(false);
      showToast('Field masih kosong', 'danger');
    }
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <ScrollView style={styles.scrollViewStyles}>
          <View style={styles.navigatorWrapper}>
            <NavigatorTab
              date="Selasa, 27 September"
              title="Presensi Manual"
              navigateTo="Dashboard"
            />
          </View>
          <View style={styles.warpperFormSignIn}>
            <TextInputComponent
              placeholder="Masukkan Nama"
              isPasswordInput={false}
              type="username"
              value={name}
              onChangeText={value => setName(value)}
            />
            <View style={{marginTop: 7}} />
            <TextInputComponent
              placeholder="Masukkan Username"
              isPasswordInput={false}
              type="username"
              value={username}
              onChangeText={value => setUsername(value)}
            />
            <View style={{marginTop: 7}} />
            <TextInputComponent
              placeholder="Masukkan Password"
              isPassword={true}
              type="password"
              value={password}
              onChangeText={value => setPassword(value)}
            />
            <View style={{marginTop: 7}} />
            <TextInputComponent
              placeholder="Konfirmasi Password"
              isPassword={true}
              type="password"
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
            />
            <ActionButton onPress={onSubmit} />
          </View>
        </ScrollView>
        {isLoading && <Loading />}
      </View>
    </>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
  warpperFormSignIn: {
    marginTop: 57,
    marginHorizontal: 17,
  },
});
