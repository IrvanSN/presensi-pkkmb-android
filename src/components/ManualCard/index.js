import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronBottom, ChevronUp} from '../../assets/icon';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {generateError, showToast} from '../../utils';

const ManualCard = ({
  name,
  group,
  prodi,
  vaccineCount,
  studentId,
  attendanceId,
  transaction,
  attendanceType,
  accountData,
  navigation,
}) => {
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [isAlreadyOut, setIsAlreadyOut] = useState(
    transaction?.out !== null ? 'Sudah' : 'Belum',
  );
  const [status, setStatus] = useState(
    transaction !== undefined ? transaction.status : '',
  );

  const onChangeStatus = changedStatus => {
    setShowItemDropdown(false);
    if (attendanceType === 'Datang') {
      setStatus(changedStatus);
      const data = {
        studentId,
        attendanceId,
        assigneeId: accountData.user._id,
        status: changedStatus,
      };

      Axios.post(`${API_HOST.url}/transaction/in`, data, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(r =>
          showToast(
            `Berhasil mengubah status presensi ${r.data.data.student.name} menjadi ${r.data.data.status}`,
            'success',
          ),
        )
        .catch(e => generateError(e, navigation));
    } else {
      setIsAlreadyOut(changedStatus);
      const data = {
        studentId,
        attendanceId,
        status: changedStatus,
      };

      Axios.put(`${API_HOST.url}/transaction/out`, data, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(r =>
          showToast(
            `Berhasil mengubah presensi pulang ${r.data.data.student.name} menjadi ${changedStatus}`,
            'success',
          ),
        )
        .catch(e => generateError(e, navigation));
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.descriptionText}>{group}</Text>
        <Text style={styles.descriptionText}>{prodi}</Text>
        <Text style={styles.descriptionText}>
          Telah melakukan vaksin ke-{vaccineCount}
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        {attendanceType === 'Datang' && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                status === '' ? 'rgba(188, 1, 30, 0.5)' : 'rgb(188, 1, 30)',
              width: 77,
              height: 26,
              borderRadius: 10,
              borderBottomRightRadius: showItemDropdown ? 0 : 10,
              borderBottomLeftRadius: showItemDropdown ? 0 : 10,
            }}
            activeOpacity={0.7}
            onPress={() => setShowItemDropdown(!showItemDropdown)}>
            <Text style={styles.statusText}>
              {status === '' ? 'Status' : `${status}`}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 4,
              }}>
              {showItemDropdown ? <ChevronUp /> : <ChevronBottom />}
            </View>
          </TouchableOpacity>
        )}
        {attendanceType === 'Pulang' && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                isAlreadyOut === 'Belum'
                  ? 'rgba(188, 1, 30, 0.5)'
                  : 'rgb(188, 1, 30)',
              width: 77,
              height: 26,
              borderRadius: 10,
            }}
            activeOpacity={0.7}
            onPress={() =>
              isAlreadyOut === 'Belum'
                ? onChangeStatus('Sudah')
                : onChangeStatus('Belum')
            }>
            <Text style={styles.statusText}>{isAlreadyOut}</Text>
          </TouchableOpacity>
        )}
        {attendanceType === 'Datang'
          ? showItemDropdown && (
              <View style={styles.dropdownItem}>
                {status !== 'Hadir' && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => onChangeStatus('Hadir')}>
                    <Text style={styles.statusText}>Hadir</Text>
                  </TouchableOpacity>
                )}
                {status !== 'Izin' && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => onChangeStatus('Izin')}>
                    <Text style={styles.statusText}>Izin</Text>
                  </TouchableOpacity>
                )}
                {status !== 'Alpa' && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => onChangeStatus('Alpa')}>
                    <Text style={styles.statusText}>Alpa</Text>
                  </TouchableOpacity>
                )}
                {status !== 'Sakit' && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => onChangeStatus('Sakit')}>
                    <Text style={styles.statusText}>Sakit</Text>
                  </TouchableOpacity>
                )}
              </View>
            )
          : showItemDropdown && (
              <View style={styles.dropdownItem}>
                {isAlreadyOut !== 'Sudah' && (
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={() => onChangeStatus('Sudah')}>
                    <Text style={styles.statusText}>Sudah</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
      </View>
    </View>
  );
};

export default ManualCard;

const styles = StyleSheet.create({
  dropdownItem: {
    backgroundColor: '#BC011E',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  wrapper: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginHorizontal: 15,
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
    flexDirection: 'row',
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
