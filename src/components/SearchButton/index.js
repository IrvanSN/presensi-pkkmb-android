import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';

const SearchButton = () => {
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7}>
      <Text style={styles.text}>Cari</Text>
    </TouchableOpacity>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    marginLeft: 13,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BC011E',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
  },
});
