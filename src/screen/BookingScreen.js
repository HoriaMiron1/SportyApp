import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';
// Function to generate the intervals
const generateIntervals = () => {
  const intervals = [];
  for (let i = 8; i < 22; i++) {
    intervals.push({ id: i, interval: `${i}:00 - ${i + 1}:00` });
  }
  return intervals;
};

// Generate the intervals
const timeIntervals = generateIntervals();

export default function BookingScreen() {
  const navigation = useNavigation();

  // Function to render each item in the FlatList
  const renderInterval = ({ item }) => (
    <TouchableOpacity
      style={{
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'lightgray',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('InformationScreen')}
    >
      <Text style={{ fontSize: 18 }}>{item.interval}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#42488df5' }}>
      <View style={styles.backButtonWrapper}>
        <BackButton goBack={navigation.goBack} />
      </View>
      <StatusBar barStyle='light-content' />
      <View style={{ flex: 1, padding: 20 }}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Book your time
        </Text>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            width: '100%', // This will make the line stretch across the full width of the screen
            marginBottom: 20,
          }}
        />
        <FlatList
          data={timeIntervals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderInterval}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButtonWrapper: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 10 : 30,
    left: 20,
    zIndex: 1, // Ensuring it stays on top of the other components and is interactive.
  },
});
