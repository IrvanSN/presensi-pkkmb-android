import React, {useCallback, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActionButton, NavigatorTab} from '../../components';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {ChevronBottom} from '../../assets/icon';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {generateError, showToast} from '../../utils';
import {useNavigation} from '@react-navigation/native';

const DetailUserData = ({route}) => {
  const {accountData, userData, attendanceData, groupData, type} = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(userData.name);
  const [prodi, setProdi] = useState(userData.prodi);
  const [vaccineCount, setVaccineCount] = useState(
    userData.vaccine.count.toString(),
  );
  const [vaccineProof, setVaccineProof] = useState(userData.vaccine.proof);
  const [selectedGroupName, setSelectedGroupName] = useState(userData.group);
  const [isDropdownClick, setIsDropdownClick] = useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onSubmit = () => {
    if (type === 'updateData') {
      const data = {
        name,
        prodi,
        group: selectedGroupName,
        vaccineCount,
        vaccineProof,
      };

      Axios.put(`${API_HOST.url}/student/${userData._id}/update`, data, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(r => {
          navigation.goBack();
          showToast(`Berhasil update data ${r.data.data.name}!`, 'success');
        })
        .catch(e => generateError(e, navigation));
    } else {
      if (!(name && selectedGroupName && vaccineCount)) {
        return showToast('Lengkapi semua data!', 'info');
      }

      const data = {
        name,
        prodi,
        group: selectedGroupName,
        vaccineCount,
        vaccineProof,
      };

      Axios.post(`${API_HOST.url}/student/add`, data, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(r => {
          navigation.goBack();
          showToast(`Berhasil tambah data ${r.data.data.name}!`, 'success');
        })
        .catch(e => generateError(e, navigation));
    }
  };

  return (
    <View style={styles.wrapper} onLayout={onLayoutRootView}>
      <View style={styles.navigatorWrapper}>
        <NavigatorTab
          date={attendanceData.title}
          title={type === 'updateData' ? 'Ubah data maba' : 'Tambah data maba'}
        />
      </View>
      <ScrollView nestedScrollEnabled={true} style={styles.bodyWrapper}>
        <Text style={styles.inputTextLabel}>Nama Lengkap</Text>
        <TextInput
          style={styles.inputText}
          value={name}
          onChangeText={value => setName(value)}
        />
        <Text style={styles.inputTextLabel}>Prodi</Text>
        <TextInput
          style={styles.inputText}
          value={prodi}
          onChangeText={value => setProdi(value)}
        />
        <Text style={styles.inputTextLabel}>Laskar</Text>
        <View style={styles.groupNameDropdown}>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#DADADA',
              height: 50,
              borderRadius: 10,
              paddingHorizontal: 15,
              alignItems: 'center',
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomRightRadius: isDropdownClick ? 0 : 10,
              borderBottomLeftRadius: isDropdownClick ? 0 : 10,
            }}
            activeOpacity={0.7}
            onPress={() => setIsDropdownClick(!isDropdownClick)}>
            <Text style={styles.groupNameText}>{selectedGroupName}</Text>
            <ChevronBottom />
          </TouchableOpacity>
          {isDropdownClick && (
            <ScrollView
              nestedScrollEnabled={true}
              style={styles.dropdownWrapper}>
              {groupData
                .filter(item => item.groupName !== selectedGroupName)
                .map(item => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    activeOpacity={0.7}
                    key={item.groupName}
                    onPress={() => {
                      setSelectedGroupName(item.groupName);
                      setIsDropdownClick(false);
                    }}>
                    <Text style={styles.dropdownItemText}>
                      {item.groupName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          )}
        </View>
        <View style={{marginBottom: 12}} />
        <Text style={styles.inputTextLabel}>Vaksinasi Ke</Text>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: '#DADADA',
            height: 50,
            borderRadius: 10,
            marginBottom: 20,
            fontFamily: 'Montserrat-Regular',
            fontSize: 14,
            paddingHorizontal: 15,
            width: 50,
          }}
          value={vaccineCount}
          onChangeText={value => setVaccineCount(value)}
          keyboardType="numeric"
        />
        <Text style={styles.inputTextLabel}>Bukti vaksin</Text>
        <TextInput
          style={styles.inputText}
          value={vaccineProof}
          onChangeText={value => setVaccineProof(value)}
        />
      </ScrollView>
      <View style={styles.actionButton}>
        <ActionButton
          onPress={onSubmit}
          title="Simpan"
          addButtonStyles={{position: 'absolute'}}
        />
      </View>
    </View>
  );
};

export default DetailUserData;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  bodyWrapper: {
    marginTop: 20,
    marginBottom: 70,
  },
  inputTextLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    marginBottom: 12,
    color: 'black',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#DADADA',
    height: 50,
    color: 'black',
    borderRadius: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  groupName: {
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupNameText: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  vaccineProof: {
    flex: 1,
    width: 150,
    height: 150,
  },
  groupNameDropdown: {
    borderColor: '#DADADA',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: 'white',
    height: 230,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  dropdownItemText: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
});
