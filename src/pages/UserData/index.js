import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NavigatorTab, TextInputComponent, UserCard} from '../../components';
import SearchButton from '../../components/SearchButton';

const UserData = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navigatorWrapper}>
        <NavigatorTab
          date="Selasa, 27 September"
          title="Data Maba"
          navigateTo="Dashboard"
        />
      </View>
      <View style={styles.searchSection}>
        <TextInputComponent
          type="username"
          isPasswordInput={false}
          placeholder="Cari dengan nama"
        />
        <SearchButton />
      </View>
      <ScrollView style={styles.collectionWrapper}>
        <UserCard groupName="1. SOETOMO" memberCount={35} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="2. SOEKARNO" memberCount={41} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="3. MOH. HATTA" memberCount={42} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
        <UserCard groupName="4. AGOES SALIM" memberCount={30} />
        <View style={{marginTop: 28}} />
      </ScrollView>
    </View>
  );
};

export default UserData;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    paddingHorizontal: 15,
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 20,
    height: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  collectionWrapper: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
});
