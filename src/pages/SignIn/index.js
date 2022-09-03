import {StyleSheet, Image, View, ScrollView} from 'react-native';
import React from 'react';
import TextInputComponent from '../../components/TextInputComponent';
import ActionButton from '../../components/ActionButton';
import {useNavigation} from '@react-navigation/native';

export default function SignIn() {
  const navigation = useNavigation();

  return (
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
        />
        <TextInputComponent
          placeholder="Masukkan password"
          isPasswordInput={true}
          type="password"
        />
        <ActionButton onPress={() => navigation.replace('Dashboard')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyles: {
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
});
