import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Stat,
  Image,
  StatusBar,
} from 'react-native';
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
} from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ logoutUser, ...props }) {
  return (
    <LinearGradient
      colors={['#5b5f84', '#c8cae1']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.gradient}
    >
      <DrawerContentScrollView
        {...props}
        style={styles.drawer}
        contentContainerStyle={styles.drawerContent}
      >
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/LogoPlayer.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.titleText}>S P O R T Y</Text>
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']}
            style={styles.line}
          />
          <Text style={styles.subtitleText}>Your number one sports app!</Text>
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.0)']}
            style={styles.line}
          />
        </View>

        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Choose your field')}
          >
            <Ionicons name='home' size={23} color='black' />
            <Text style={styles.menuItemText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('My profile')}
          >
            <Ionicons name='person-circle' size={23} color='black' />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => props.navigation.navigate('Information')}
          >
            <Ionicons name='information-circle' size={23} color='black' />
            <Text style={styles.menuItemText}>Information</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
          <Ionicons name='log-out-outline' size={23} color='white' />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </LinearGradient>
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
        drawerStyle: {
          backgroundColor: Platform.OS === 'ios' ? '#75799ef5' : '#ffffff50',
        },
      }}
    >
      <Drawer.Screen name='Choose your field' component={HomeScreen} />
      <Drawer.Screen name='My profile' component={ProfileScreen} />
      <Drawer.Screen name='Information' component={InformationScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawer: {
    flex: 1,
  },
  drawerContent: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 5,
    textAlign: 'center',
  },
  menuItems: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItemText: {
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b00020',
    padding: 15,
    margin: 5,
    marginTop: 300,
    borderRadius: 10,
  },
  logoutText: {
    color: 'white',
    marginLeft: 10,
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center', // Center horizontally
  },
  gradient: {
    flex: 1,
  },
});
