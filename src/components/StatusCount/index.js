import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useFonts} from 'expo-font';

const StatusCount = props => {
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.wrapper}>
      <Text style={styles.countStyle}>{props.count}</Text>
      <Text style={styles.titleStyle}>{props.title}</Text>
    </View>
  );
};

export default StatusCount;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  countStyle: {
    fontFamily: 'Montserrat-ExtraBold',
    color: '#FFFFFF',
    fontSize: 28,
    marginBottom: 5,
  },
  titleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    fontSize: 14,
  },
});
