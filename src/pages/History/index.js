import React, {useState, useCallback, useEffect} from 'react';
import {useFonts} from 'expo-font';
import {ActionButton, NavigatorTab, TextInputComponent} from '../../components';
import {ScrollView, ToastAndroid} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {StyleSheet, View} from 'react-native';

const History = () => {
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
    setIsLoading(true);
    const data = {
      username,
      password,
    };

    if (password != confirmPassword) {
      ToastAndroid.showWithGravity(
        'Passsword yang anda masukkan tidak sama',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      return History;
    }
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <ScrollView style={styles.ScrollViewStyles}>
          <View style={styles.warpperFormSignIn}>
            <TextInputComponent
              placeholder="Masukkan Username"
              isPasswordInput={false}
              type="username"
              value={username}
              onChangeText={value => setUsername()}
            />
            <View style={{marginTop:7}}/>
            <TextInputComponent
              placeholder="Masukkan Password"
              isPassword={true}
              type="password"
              value={password}
              onChangeText={value => setPassword()}
            />
            <View style={{marginTop:7}}/>
            <TextInputComponent
              placeholder="Konfirmasi Password"
              isPassword={true}
              type="password"
              value={confirmPassword}
              onChangeText={value => setConfirmPassword()}
            />
            <ActionButton onPress={onSubmit} />
          </View>
          <View style={styles.navigatorWrapper}>
            <NavigatorTab
              date="Selasa, 27 September"
              title="Presensi Manual"
              navigateTo="Dashboard"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
});
