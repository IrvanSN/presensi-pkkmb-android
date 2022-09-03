import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardMenu from '../../components/CardMenu';
import StatusCount from '../../components/StatusCount';

const Dashboard = () => {
  const navigation = useNavigation();

  const onLogout = () => {
    AsyncStorage.removeItem('token').then(() =>
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]}),
    );
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.redBox}>
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <Text style={styles.subTitle}>Selasa, 27 September</Text>
            <Text style={styles.title}>PKKMB 2022</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={onLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statusCountWrapper}>
          <StatusCount count={581} title={'Hadir'} />
          <StatusCount count={12} title={'Izin'} />
          <StatusCount count={2} title={'Sakit'} />
          <StatusCount count={20} title={'Alpa'} />
        </View>
      </View>
      <View style={styles.cards}>
        <CardMenu title="Datang" type="datang" />
        <CardMenu title="Pulang" type="pulang" />
        <CardMenu title="Manual" type="manual" />
        <CardMenu title="Data Maba" type="data-maba" />
        <CardMenu title="Add User" type="create-user" />
        <CardMenu title="Histori" type="histori" />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  redBox: {
    paddingHorizontal: 18,
    paddingTop: 25,
    backgroundColor: '#BC011E',
    height: 238,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  titleWrapper: {
    flexDirection: 'column',
  },
  title: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  subTitle: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F7AD48',
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 5,
    height: 27,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    color: 'black',
  },
  statusCountWrapper: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginTop: 50,
  },
});
