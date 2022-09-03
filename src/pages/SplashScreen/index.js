import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn');
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
