import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const ActionButton = props => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={props.onPress}
        style={styles.buttonStyles}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 42,
  },
  buttonStyles: {
    alignItems: 'center',
    borderRadius: 23,
    paddingVertical: 15,
    backgroundColor: '#BC011E',
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
