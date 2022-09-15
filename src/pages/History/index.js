import React, {useCallback, useEffect, useState} from 'react';
import {useFonts} from 'expo-font';
import {HistoryCard, Loading, NavigatorTab} from '../../components';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Axios from 'axios';
import {API_HOST} from '../../config';
import {generateError} from '../../utils';

const History = ({route}) => {
  const navigation = useNavigation();
  const {attendanceData, accountData} = route.params;
  const [listAttendance, setListAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      Axios.get(`${API_HOST.url}/attendance/all`, {
        headers: {
          Authorization: `Bearer ${accountData.token}`,
        },
      })
        .then(item => {
          setListAttendance(item.data.data);
          setIsLoading(false);
        })
        .catch(e => {
          setIsLoading(false);
          generateError(e, navigation);
        });
    }, []),
  );

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onPressDownload = id => {
    setIsLoading(true);
    Axios.get(`${API_HOST.url}/attendance/${id}/export/csv`, {
      headers: {
        Authorization: `Bearer ${accountData.token}`,
      },
    })
      .then(item => {
        Linking.openURL(API_HOST.url + item.data.data.link).then(() =>
          setIsLoading(false),
        );
      })
      .catch(e => {
        setIsLoading(false);
        generateError(e, navigation);
      });
  };

  return (
    <>
      <View style={styles.wrapper} onLayout={onLayoutRootView}>
        <View style={styles.navigatorWrapper}>
          <NavigatorTab date={attendanceData.title} title="Histori" />
        </View>
        <ScrollView>
          <View
            style={{backgroundColor: 'rgba(255, 0, 0, 0)', marginVertical: 7.5}}
          />
          {listAttendance.map(item => (
            <HistoryCard
              key={item._id}
              attendance={item}
              onPressActiveButton={() => onPressDownload(item._id)}
            />
          ))}
        </ScrollView>
      </View>
      {isLoading && <Loading />}
    </>
  );
};

export default History;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 50,
  },
  navigatorWrapper: {
    marginHorizontal: 15,
    marginBottom: 5,
  },
  collectionWrapper: {
    flex: 1,
  },
});
