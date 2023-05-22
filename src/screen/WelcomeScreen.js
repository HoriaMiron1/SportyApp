import React from 'react';
import Background from '../components/Background';
import Button from '../components/Button';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../core/config';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './ProfileScreen';
import InformationScreen from './InformationScreen';
import HomeScreen from './HomeScreen';
import { actionTypes } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function LogoutScreen({ navigation }) {
  const [{}, dispatch] = useStateValue();
  const logoutUser = () => {
    auth.signOut();
    dispatch({
      type: actionTypes.SET_USER,
      user: {},
    });
  };
  return (
    <Background>
      <StatusBar style='dark' />
      <Button
        style={styles.logout}
        onPress={() => {
          logoutUser();
        }}
        mode='contained'
      >
        Logout
      </Button>
    </Background>
  );
}

function CustomDrawerContent({ logoutUser, ...props }) {
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>S P O R T Y</Text>
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ paddingTop: 400 }}>
        <DrawerItem
          label='Logout'
          icon={({ focused, color, size }) => (
            <Ionicons name='log-out-outline' color={color} size={size} />
          )}
          onPress={logoutUser}
        />
      </View>
    </DrawerContentScrollView>
  );
}

export default function WelcomeScreen() {
  const [{}, dispatch] = useStateValue();
  const logoutUser = () => {
    auth.signOut();
    dispatch({
      type: actionTypes.SET_USER,
      user: {},
    });
  };
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} logoutUser={logoutUser} />
      )}
      screenOptions={{
        headerStyle: { backgroundColor: '#42488df5' },
        headerTintColor: 'white',
        drawerActiveBackgroundColor: '#c8cae1f5',
        drawerStyle: {
          backgroundColor: Platform.OS === 'android' ? '#cdddd5' : '#cdddd550',
        },
      }}
    >
      <Drawer.Screen
        name='Choose your field'
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='My profile'
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='person-circle' color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name='Information'
        component={InformationScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name='information-circle' color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {},
});
