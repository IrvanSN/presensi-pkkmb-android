import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, TextInput, View} from 'react-native';
import {Lock, User, EyeSlash, Eye} from '../../assets/icon';

const TextInputComponent = props => {
  const [isHiddenPassword, setIsHiddenPassword] = useState(true);
  const onPressed = () => setIsHiddenPassword(isHiddenPassword ? false : true);

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconLeft}>
        {props.type === 'username' ? (
          <User />
        ) : props.type === 'password' ? (
          <Lock />
        ) : (
          ''
        )}
      </View>
      <TextInput
        secureTextEntry={props.isPasswordInput ? isHiddenPassword : false}
        style={styles.textInputStyles}
        placeholder={props.placeholder}
      />
      <TouchableOpacity style={styles.iconRight} onPress={onPressed}>
        {props.type === 'password' ? (
          isHiddenPassword ? (
            <EyeSlash />
          ) : (
            <Eye />
          )
        ) : (
          ''
        )}
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
