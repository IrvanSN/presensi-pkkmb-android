import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const BasicButton = ({text, isActive, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isActive ? '#BC011E' : 'white',
        borderRadius: isActive ? 10 : 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 12,
      }}>
      <Text
        style={{
          color: isActive ? 'white' : '#87898E',
          fontFamily: isActive ? 'Montserrat-SemiBold' : 'Montserrat-Regular',
          fontSize: 14,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default BasicButton;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
