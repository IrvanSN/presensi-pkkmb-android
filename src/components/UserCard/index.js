import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateError, showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import {API_HOST} from '../../config';

const UserCard = ({
  id,
  name,
  vaccineCount,
  groupName,
  transaction,
  onPressChangeData,
  accountData,
  prodi,
}) => {
  const navigation = useNavigation();
  const [clickCount, setClickCount] = useState(0);

  const dayOne = transaction.filter(
    item => item.attendance.title === 'Selasa, 27 September',
  )[0];
  const dayTwo = transaction.filter(
    item => item.attendance.title === 'Rabu, 28 September',
  )[0];
  const dayThree = transaction.filter(
    item => item.attendance.title === 'Kamis, 29 September',
  )[0];

  const onDeleteData = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 3) {
      Axios.delete(`${API_HOST.url}/student/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(r => {
          navigation.goBack();
          showToast(`Berhasil hapus data ${r.data.data.name}!`, 'success');
        })
        .catch(e => generateError(e, navigation));
    } else if (clickCount === 0) {
      showToast('Untuk menghapus data klik 3x tombol Hapus Data!', 'info');
    } else if (3 - clickCount < 0) {
      return setClickCount(3);
    } else {
      showToast(
        `Klik ${3 - clickCount}x lagi untuk menghapus data!`,
        'warning',
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>Id: {id}</Text>
        <Text style={styles.descriptionText}>Vaksin ke-{vaccineCount}</Text>
        <Text style={styles.descriptionText}>Prodi: {prodi}</Text>
        <Text style={styles.descriptionText}>Laskar: {groupName}</Text>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.descriptionText}>Day 1:</Text>
            <View
              style={{
                borderRadius: 3,
                marginLeft: 5,
                backgroundColor: dayOne
                  ? dayOne.status === 'Hadir'
                    ? 'green'
                    : dayOne.status === 'Sakit' || dayOne.status === 'Izin'
                    ? 'yellow'
                    : 'red'
                  : 'red',
                width: 20,
                height: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Text style={styles.descriptionText}>Day 2:</Text>
            <View
              style={{
                borderRadius: 3,
                marginLeft: 5,
                backgroundColor: dayTwo
                  ? dayTwo.status === 'Hadir'
                    ? 'green'
                    : dayTwo.status === 'Sakit' || dayTwo.status === 'Izin'
                    ? 'yellow'
                    : 'red'
                  : 'red',
                width: 20,
                height: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Text style={styles.descriptionText}>Day 3:</Text>
            <View
              style={{
                borderRadius: 3,
                marginLeft: 5,
                backgroundColor: dayThree
                  ? dayThree.status === 'Hadir'
                    ? 'green'
                    : dayThree.status === 'Sakit' || dayThree.status === 'Izin'
                    ? 'yellow'
                    : 'red'
                  : 'red',
                width: 20,
                height: 10,
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.7}
          onPress={onPressChangeData}>
          <Text style={styles.textButtonActive}>Ubah Data</Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 15}} />
        <TouchableOpacity
          style={styles.buttonDeactive}
          activeOpacity={0.7}
          onPress={onDeleteData}>
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
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  textButtonDeactive: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#87898E',
  },
});
