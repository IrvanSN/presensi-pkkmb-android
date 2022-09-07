import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const SearchButton = () => {
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
