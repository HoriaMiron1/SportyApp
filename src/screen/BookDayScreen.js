import React, { useLayoutEffect } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

const dayOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function BookDayScreen() {
  const navigation = useNavigation();
  const [{ daysOfTheWeek }, dispatch] = useStateValue();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Booking',
      headerStyle: {
        backgroundColor: '#42488df5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const saveDayToContext = (e, item) => {
    dispatch({
      type: actionTypes.SET_DAYSOFTHEWEEEK,
      daysOfTheWeek: item,
    });
    navigation.navigate('BookTimeScreen', { selectedDay: item });
  };

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.dayContainer}
        onPress={(e) => saveDayToContext(e, item)}
      >
        <LinearGradient
          // Adjust the colors as needed
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.gradientContainer}
        >
          <Text style={{ fontSize: 18 }}>{item}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#434395', '#869ca3', '#b3acac']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={dayOfWeek}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 0,
    marginTop: 15,
    padding: 30,
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    marginBottom: -60,
    marginTop: 0,
    padding: 30,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
