import React from 'react';
import Header from '../components/Header';
import { Paragraph } from 'react-native-paper';
import Button from '../components/Button';
import Logo from '../components/Logo';
import { View, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function StartScreen({ navigation }) {
  return (
    <LinearGradient
      colors={['#181f67f5', '#565a86f5']}
      style={styles.background}
    >
      <ImageBackground
        source={require('../assets/footballimage4.jpg')}
        resizeMode='cover'
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        {/*This is for Android (StatusBar)*/}
        <View style={styles.container}>
          <Logo />
          <Header> S p o r t y</Header>
          <Paragraph style={{ color: 'grey', fontWeight: 'bold' }}>
            A new way for playing football
          </Paragraph>
          <Button
            onPress={() => {
              navigation.navigate('LoginScreen');
            }}
            mode={'outlined'}
          >
            Login
          </Button>
          <Button
            mode={'contained'}
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}
          >
            Sign Up
          </Button>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 340,
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
