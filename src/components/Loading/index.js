import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <ActivityIndicator size="large" color="#DC0000" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 140,
    height: 120,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    marginTop: 12,
    color: 'black',
  },
});
