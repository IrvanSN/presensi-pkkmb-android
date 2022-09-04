import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Eye, EyeSlash, Lock, User} from '../../assets/icon';
import {useFonts} from 'expo-font';

const TextInputComponent = ({
  type,
  isPasswordInput,
  placeholder,
  ...restProps
}) => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const onPressed = () => setIsHiddenPassword(!isHiddenPassword);
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconLeft}>
        {type === 'username' ? <User /> : type === 'password' ? <Lock /> : ''}
      </View>
      <TextInput
        secureTextEntry={isPasswordInput ? isHiddenPassword : false}
        style={styles.textInputStyles}
        placeholder={placeholder}
        {...restProps}
      />
      <TouchableOpacity style={styles.iconRight} onPress={onPressed}>
        {type === 'password' ? isHiddenPassword ? <EyeSlash /> : <Eye /> : ''}
      </TouchableOpacity>
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 7,
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 10,
  },
  textInputStyles: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: 'black',
  },
  iconLeft: {
    margin: 18,
    justifyContent: 'center',
  },
  iconRight: {
    margin: 18,
    justifyContent: 'center',
  },
});