import { View, Text } from 'react-native';
import React from 'react';
import { useStateValue } from '../context/StateProvider';

export default function ProfileScreen() {
  const [{ user }] = useStateValue();
  console.log(user);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This is your email</Text>
      <Text>{user.email}</Text>
      <Text>{user.displayName}</Text>
      {/* <Text>{user.}</Text>
       */}
    </View>
  );
}
