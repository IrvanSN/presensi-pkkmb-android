import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../../utils';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      getData('token').then(r => {
        if (r) {
          navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 1000);
  });

  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.logoVerticalStyles}
        source={require('../../assets/logo/LogoVertical.png')}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoVerticalStyles: {
    width: 173,
    height: 282,
  },
});
