import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useStateValue } from '../context/StateProvider';

export default function ProfileScreen() {
  const [{ user }] = useStateValue();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title='Pick an image from gallery' onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.text}>Hello</Text>
      <Text style={styles.text}>{user.email}</Text>
      <Text style={styles.text}>{user.displayName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
  },
});
