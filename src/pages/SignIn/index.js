import {useNavigation} from '@react-navigation/native';
import {API_HOST} from '../../config';
import Axios from 'axios';
import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import ActionButton from '../../components/ActionButton';
import Loading from '../../components/Loading';
import TextInputComponent from '../../components/TextInputComponent/';
import {showToast, storeData} from '../../utils';

export default function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('johndoe');
  const [password, setPassword] = useState('123hore');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);
    const data = {
      username,
      password,
    };

    if (username && password) {
      Axios.post(`${API_HOST.url}/auth`, data)
        .then(r => {
          storeData('token', {value: r.data.data.token});
          setIsLoading(false);
          navigation.replace('Dashboard');
        })
        .catch(e => {
          setIsLoading(false);
          showToast(e.response.data.message, 'danger');
        });
    }
  };

  return (
    <>
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
          <ActionButton onPress={onSubmit} />
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
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
});
