import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ActionButton = ({onPress, title}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={styles.buttonStyles}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyles: {
    alignItems: 'center' ,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
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
