import {useNavigation} from '@react-navigation/native';
import {API_HOST} from '../../config';
import Axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {ActionButton, Loading, TextInputComponent} from '../../components';
import {showToast, storeData} from '../../utils';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {MadeByCoder} from '../../assets/icon';

export default function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    const data = {
      username,
      password,
    };

    if (username && password) {
      Axios.post(`${API_HOST.url}/auth`, data)
        .then(r => {
          storeData('user', r.data.data);
          setIsLoading(false);
          navigation.replace('AttendancePicker');
        })
        .catch(e => {
          setIsLoading(false);
          showToast(e.response.data.message, 'danger');
        });
    }
  };

  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <ScrollView style={styles.scrollViewStyles}>
        <View style={styles.wrapperImage}>
          <Image
            style={styles.logoVerticalStyles}
            source={require('../../assets/logo/LogoVertical.png')}
          />
        </View>
        <View style={styles.wrapperFormSignIn}>
          <TextInputComponent
            placeholder="Masukkan username"
            isPasswordInput={false}
            type="username"
            value={username}
            onChangeText={value => setUsername(value)}
          />
          <View style={{marginTop: 7}} />
          <TextInputComponent
            placeholder="Masukkan password"
            isPasswordInput={true}
            type="password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <View style={{marginTop: 42}} />
          <ActionButton onPress={onSubmit} title="Sign In" />
        </View>
        <View style={styles.footer}>
          <MadeByCoder />
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollViewStyles: {
    paddingTop: 30,
    backgroundColor: '#F5F5F5',
  },
  wrapperImage: {
    alignItems: 'center',
  },
  logoVerticalStyles: {
    marginTop: 30,
    width: 173,
    height: 282,
  },
  wrapperFormSignIn: {
    marginTop: 57,
    marginHorizontal: 17,
  },
  footer: {
    marginTop: 138,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
});
