import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NavigatorTab, TextInputComponent} from '../../components';
import SearchButton from '../../components/SearchButton';
import ManualCard from '../../components/ManualCard';

const Manual = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.navigatorWrapper}>
        <NavigatorTab
          date="Selasa, 27 September"
          title="Presensi Manual"
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
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard
          name="John Ahmad"
          groupName="2. SOEKARNO"
          vaccineCount={3}
        />
        <View style={{marginTop: 28}} />
        <ManualCard
          name="John Subekti"
          groupName="1. SOETOMO"
          vaccineCount={3}
        />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={1} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={2} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
        <ManualCard name="John Doe" groupName="1. SOETOMO" vaccineCount={3} />
        <View style={{marginTop: 28}} />
      </ScrollView>
    </View>
  );
};

export default Manual;

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
