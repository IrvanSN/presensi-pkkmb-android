import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const UserCard = ({id, name, vaccineCount, groupName}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>Id: {id}</Text>
        <Text style={styles.descriptionText}>Vaksin ke-{vaccineCount}</Text>
        <Text style={styles.descriptionText}>Kelompok: {groupName}</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonActive} activeOpacity={0.7}>
          <Text style={styles.textButtonActive}>Ubah Data</Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 15}} />
        <TouchableOpacity style={styles.buttonDeactive} activeOpacity={0.7}>
          <Text style={styles.textButtonDeactive}>Hapus Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 15,
    marginHorizontal: 15,
    marginBottom: 20,
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'center',
  },
  descriptionText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#4F5D75',
  },
  descriptionWrapper: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonActive: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BC011E',
    paddingHorizontal: 6,
    paddingVertical: 9,
  },
  textButtonActive: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: 'white',
  },
  buttonDeactive: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#87898E',
    paddingHorizontal: 6,
    paddingVertical: 9,
  },
  textButtonDeactive: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#87898E',
  },
});
