import { View, Text } from 'react-native';
import React from 'react';

export default function InformationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        This is where the confirmation button will appear and the booking
        details will be send on email
      </Text>
    </View>
  );
}
