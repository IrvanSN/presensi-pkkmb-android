import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChevronLeftNavigator} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';

const NavigatorTab = ({date, title, navigateTo, isWhiteColor}) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.navigatorTab}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.circleChevron}
          onPress={
            navigateTo
              ? () => navigation.navigate(navigateTo)
              : () => navigation.goBack()
          }>
          <ChevronLeftNavigator />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
              color: isWhiteColor ? 'white' : 'black',
            }}>
            {date}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 16,
              color: isWhiteColor ? 'white' : 'black',
            }}>
            {title}
          </Text>
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
});
