import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  BackwardClock,
  Clip,
  QR,
  SquarePlus,
  UserChecklist,
} from '../../assets/icon';
import React from 'react';
import {useFonts} from 'expo-font';

const CardMenu = props => {
  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.wrapper}
      onPress={props.onPress}>
      {props.type === 'datang' || props.type === 'pulang' ? (
        <QR />
      ) : props.type === 'manual' ? (
        <UserChecklist />
      ) : props.type === 'data-maba' ? (
        <Clip />
      ) : props.type === 'create-user' ? (
        <SquarePlus />
      ) : props.type === 'histori' ? (
        <BackwardClock />
      ) : (
        <QR />
      )}
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default CardMenu;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 90,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 50,
    shadowColor: 'black',
    shadowOffset: {
      width: -6,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    marginTop: 7,
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: 'black',
  },
});
