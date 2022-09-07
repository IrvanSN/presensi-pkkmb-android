import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ManualCard = ({name, groupName, vaccineCount}) => {
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.descriptionText}>Kelompok {groupName}</Text>
        <Text style={styles.descriptionText}>
          Telah Melakukan vaksin ke-{vaccineCount}
        </Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.7}>
        <Text style={styles.statusText}>Status</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManualCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 13,
    justifyContent: 'space-between',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: -6,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  nameText: {
    color: 'black',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  descriptionText: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BC011E',
    width: 77,
    height: 26,
    borderRadius: 10,
  },
  statusText: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
});
