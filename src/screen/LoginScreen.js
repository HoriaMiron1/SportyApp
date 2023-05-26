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
import { theme } from '../core/theme';

//Components IMPORTS
import Header from '../components/Header';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import GoogleLogin from '../components/GoogleLogin';

//Core IMPORTS
import { emailValidator } from '../core/helpers/emailValidator';
import { passwordValidator } from '../core/helpers/passwordValidator';
import { auth } from '../core/config';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

//Context IMPORTS
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((auth) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: auth.user,
          });
          navigation.replace('WelcomeScreen');
          setLoading(false);
          // alert(auth.user.email);
        })
        .catch((e) => {
          alert('User or password incorect ');
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
            style={{
              flex: 1,
              backgroundColor: '#121330',
            }}
          >
            <View
              style={{
                backgroundColor: '#121330',
              }}
            >
              <StatusBar barStyle='white-content' />
            </View>
            <Background>
              {/* This is for Android (StatusBar)*/}
              <StatusBar backgroundColor='#121330' />
              <BackButton goBack={navigation.goBack}></BackButton>
              <Logo />
              <Header>Welcome</Header>
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
              <View style={styles.forgotPassword}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ResetPasswordScreen')}
                >
                  <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>
              <Button
                loading={loading}
                mode='contained'
                onPress={onLoginPressed}
              >
                Login
              </Button>
              <GoogleLogin />
              <View style={styles.row}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.replace('RegisterScreen')}
                >
                  <Text style={styles.link}>Sign Up</Text>
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
});
