import React, { useLayoutEffect, useState } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Button,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

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

  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

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
  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    if (selectedDay === null) {
      // If no day is selected, render the days of the week with no background
      return (
        <TouchableOpacity
          style={styles.dayContainer}
          onPress={() => setSelectedDay(item)}
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
    } else {
      // If a day is selected, render the time intervals with a normal background
      return (
        <TouchableOpacity
          style={styles.intervalContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 18 }}>{item.interval}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#a6a9c1f5' }}>
      {selectedDay && (
        <Text style={styles.selectedDayText}> {selectedDay}</Text> //Shows me dynamically the day I selected
      )}
      <FlatList
        data={selectedDay ? timeIntervals : daysOfWeek}
        keyExtractor={(item) =>
          typeof item === 'object' ? item.id.toString() : item
        }
        renderItem={renderItem}
      />

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalView}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalText}>
              Your selected time interval details here
            </Text>

            <Button
              title='Cancel'
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Button
              title='Confirm reservation'
              //onPress={() => setModalVisible(!modalVisible)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
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
  selectedDayText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
  },
  intervalContainer: {
    marginBottom: 0,
    marginTop: 15,
    padding: 30,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
