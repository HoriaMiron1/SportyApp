import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Imgaes IMPORTS
import footballimage3 from '../assets/footballimage3.jpg';

//Define Image data
const images = [
  {
    id: '1',
    title: 'Fabrica de fotbal',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '2',
    title: 'Teren Fotbal Sintetic Gușterița',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '3',
    title: 'Sintetic Valea Aurie',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '4',
    title: 'Teren fotbal Sura Mica',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '5',
    title: 'Luceafarul',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '6',
    title: 'Pamira football',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '7',
    title: 'Teren sintetic Strand',
    source: footballimage3,
    target: 'BookingScreen',
  },
  // Add more images here
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: 10 }}
      onPress={() => navigation.navigate(item.target)}
    >
      <Image source={item.source} style={styles.image} />
      <View style={styles.TextImage}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#a6a9c1f5' }}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingRight: 10 }} // add padding to the right side of content container, pt scrollbar
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    //overflow: 'hidden', //no contenent goes outside of rounded corners
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TextImage: {
    flex: 1,
    padding: 16, // Increase padding to make background larger
    margin: 0, // Remove margin to make the background flush with image
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    justifyContent: 'center', // Center the title vertically
  },
});
