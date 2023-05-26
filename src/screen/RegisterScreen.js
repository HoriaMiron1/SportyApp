import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
//Components IMPORTS
import Header from '../components/Header';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import GoogleLogin from '../components/GoogleLogin';
import { theme } from '../core/theme';
//Core - helpers IMPORTS
import { emailValidator } from '../core/helpers/emailValidator';
import { passwordValidator } from '../core/helpers/passwordValidator';
import { nameValidator } from '../core/helpers/nameValidator';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../core/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [name, setName] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((auth) => {
          navigation.replace('LoginScreen');
          setLoading(false);
          // alert(auth.user.email);
          updateProfile(auth.currentUser, { displayName: name.value }).catch(
            (err) => console.log(err)
          );
        })
        .catch((e) => {
          alert('Try again Email/Password/Name already in use.');
          setLoading(false);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <SafeAreaView
            style={[
              styles.safeAreaView,
              Platform.OS === 'ios' ? styles.safeAreaViewIOS : {},
            ]}
          >
            <View style={{ backgroundColor: '#121330' }}>
              <StatusBar barStyle='white-content' />
            </View>
            <Background>
              <BackButton goBack={navigation.goBack}></BackButton>
              <Logo />
              <Header>Create Account</Header>
              <TextInput
                value={email.value}
                error={email.error}
                errorText={email.error}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                label='Email'
              />
              <TextInput
                value={password.value}
                error={password.error}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                label='Password'
                secureTextEntry
                errorText={password.error}
              />

              <TextInput
                value={name.value}
                error={name.error}
                errorText={name.error}
                onChangeText={(text) => setName({ value: text, error: '' })}
                label='Name'
              />
              <Button
                loading={loading}
                mode='contained'
                onPress={onSignUpPressed}
              >
                Sign Up
              </Button>
              <GoogleLogin />
              <View style={styles.row}>
                <Text>Already have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('LoginScreen')}
                >
                  <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
              </View>
            </Background>
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#121330',
  },
  safeAreaViewIOS: {
    backgroundColor: '#121330',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
