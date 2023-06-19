import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  Pressable,
} from 'react-native';

import axios from 'react-native-axios';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

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

export default function BookTimeScreen({ route }) {
  // State to control the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);
  const selectedDay = route.params?.selectedDay || 'No day selected';
  const [{ field, daysOfTheWeek, timeInterval, user }, dispatch] =
    useStateValue();

  const saveTimeToContext = (e, item) => {
    dispatch({
      type: actionTypes.SET_TIMEINTERVAL,
      timeInterval: item.interval,
    });
    setModalVisible(true);
    // alert(field + daysOfTheWeek + timeInterval + user.email);
  };

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.intervalContainer}
        onPress={(e) => saveTimeToContext(e, item)}
      >
        <Text style={{ fontSize: 18 }}>{item.interval}</Text>
      </TouchableOpacity>
    );
  };

  // Handle send email for reservation
  const handleConfirmReservation = () => {
    // try {
    //try to send the call the function using axios
    let message = `Dear Customer,\n\nYour reservation at ${field} is confirmed for ${selectedDay} during the following time slot: ${timeInterval}.\n\nPlease arrive at least 15 minutes prior to your reservation for a smooth check-in.\n\nIf you have any questions, feel free to contact us.\n\nBest Regards,\nSporty Team`;

    axios
      .get(
        `https://us-central1-sportyapp-de1c4.cloudfunctions.net/sendEmail/?sender=sportyappteam@gmail.com&dest=${user.email}&message=${message}`
      )
      .then(function (response) {
        setModalVisible(!modalVisible);
        alert('Reservation Confirmed');
      })
      .catch(function (error) {
        setModalVisible(!modalVisible);
        alert(error);
      });

    // if (response.data.status === 200) {
    //   setModalVisible(!modalVisible);
    //   alert('Reservation Confirmed');
    // }
    // } catch (error) {
    //   setModalVisible(!modalVisible);
    //   alert(error);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#a6a9c1f5' }}>
      <Text style={styles.selectedDayText}>{selectedDay}</Text>
      <View style={styles.divider} />
      <FlatList
        data={timeIntervals}
        keyExtractor={(item) => item.id.toString()}
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
              Upon confirming, you will receive an email with the details of
              your reservation at {field} for the slot: {timeInterval}. Please
              ensure to check your inbox.
            </Text>

            <Button
              title='Cancel'
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Button
              title='Confirm reservation'
              onPress={handleConfirmReservation}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  selectedDayText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 15,
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    height: 2, // this determines the thickness of the line
    width: '90%',
    backgroundColor: '#836565', // change this to the color you want
    alignSelf: 'center',
    marginVertical: 10, // gives some space above and below the line
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
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
