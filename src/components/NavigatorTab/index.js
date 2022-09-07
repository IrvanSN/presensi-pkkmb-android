import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftNavigator} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';

const NavigatorTab = ({navigateTo, date, title}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.navigatorTab}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.circleChevron}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: `${navigateTo}`}],
            })
          }>
          <ChevronLeftNavigator />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export default NavigatorTab;

const styles = StyleSheet.create({
  circleChevron: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigatorTab: {
    flexDirection: 'row',
  },
  header: {
    marginLeft: 15,
    flexDirection: 'column',
  },
  date: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});
