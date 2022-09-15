import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const HistoryCard = ({attendance, onPressActiveButton}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>{attendance.title}</Text>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.7}
          onPress={onPressActiveButton}>
          <Text style={styles.textButtonActive}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
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
  titleText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginBottom: 17,
    alignSelf: 'center',
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 30,
    paddingVertical: 9,
  },
  textButtonDeactive: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#87898E',
  },
});
