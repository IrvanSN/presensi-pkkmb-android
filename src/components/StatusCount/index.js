import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const StatusCount = props => {
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
