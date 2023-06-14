import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

// Imgaes IMPORTS
import footballimage3 from '../assets/footballimage3.jpg';

//Define Image data
const images = [
  {
    id: '1',
    title: 'Fabrica de fotbal',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '2',
    title: 'Teren Fotbal Sintetic Gușterița',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '3',
    title: 'Sintetic Valea Aurie',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '4',
    title: 'Teren fotbal Sura Mica',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '5',
    title: 'Luceafarul',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '6',
    title: 'Pamira football',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  {
    id: '7',
    title: 'Teren sintetic Strand',
    source: footballimage3,
    target: 'BookDayScreen',
  },
  // Add more images here
];
const isAndroid = Platform.OS === 'android';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [{ field }, dispatch] = useStateValue();

  const saveFieldToContext = (e, item) => {
    dispatch({
      type: actionTypes.SET_FIELD,
      field: item.title,
    });
    navigation.navigate(item.target);
  };

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      style={{ marginBottom: 10 }}
      onPress={(e) => saveFieldToContext(e, item)}
    >
      <Image source={item.source} style={styles.image} />
      <View style={styles.TextImage}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#434395', '#869ca3', '#b3acac']}
      style={styles.container}
    >
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <FlatList
          data={images}
          renderItem={renderImageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 10 }} // add padding to the right side of content container, pt scrollbar
        />
      </View>
    </LinearGradient>
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
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
