import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Imgaes IMPORTS
import footballimage3 from '../assets/footballimage3.jpg';

//Define Image data
const images = [
  {
    id: '1',
    title: 'Field 1',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '2',
    title: 'Field 2',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '3',
    title: 'Field 3',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '4',
    title: 'Field 4',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '5',
    title: 'Field 5',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '6',
    title: 'Field 6',
    source: footballimage3,
    target: 'BookingScreen',
  },
  {
    id: '7',
    title: 'Field 7',
    source: footballimage3,
    target: 'BookingScreen',
  },
  // Add more images here
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: 10, alignItems: 'center' }}
      onPress={() => navigation.navigate(item.target)}
    >
      <Image source={item.source} style={{ width: '100%', height: 150 }} />
      <Text>{item.title}</Text>
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
