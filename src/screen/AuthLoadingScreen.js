import React from 'react';
import { ActivityIndicator } from 'react-native';
import Background from '../components/Background';
import { auth } from '../core/config';

export default function AuthLoadingScreen({ navigation }) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.reset({
        routes: [{ name: 'WelcomeScreen' }],
      });
    } else {
      // User is not logged in
      navigation.reset({
        routes: [{ name: 'StartScreen' }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size='large' />
    </Background>
  );
}
