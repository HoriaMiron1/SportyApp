import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { theme } from '../core/theme';
import Header from '../components/Header';
import { Paragraph } from 'react-native-paper';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';
import { emailValidator } from '../core/helpers/emailValidator';
import BackButton from '../components/BackButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from '../core/config';
export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  const onSubmitPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
    } else {
      sendPasswordResetEmail(auth, email.value)
        .then((auth) => {
          //setLoading(false);
          alert('abcd');
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#121330',
      }}
    >
      <View style={{ backgroundColor: '#121330' }}>
        <StatusBar barStyle='white-content' />
      </View>
      <Background>
        <BackButton goBack={navigation.goBack}></BackButton>
        <Logo />
        <Header>Restore Password</Header>
        <TextInput
          value={email.value}
          error={email.error}
          errorText={email.error}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          label='Email'
          description='  You will receive email with password reset link.'
        />
        <Button mode='contained' onPress={onSubmitPressed}>
          Send Instructions
        </Button>
      </Background>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
