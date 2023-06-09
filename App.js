import { Provider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from './src/core/theme';
import { NavigationContainer } from '@react-navigation/native';
//import { createDrawerNavigator } from '@react-navigation/drawer'; // Import createDrawerNavigator EROARE IMI DA LA BABEL.CONFIG.JS
//SCreen IMPORTS
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  WelcomeScreen,
  InformationScreen,
  BookDayScreen,
  BookTimeScreen,
  AuthLoadingScreen,
} from './src/screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StateProvider } from './src/context/StateProvider';
import reducer, { initialState } from './src/context/reducer';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();
//const Drawer = createDrawerNavigator(); // Create a Drawer navigator instance

export default function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Provider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName='AuthLoadingScreen'
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name='AuthLoadingScreen'
                component={AuthLoadingScreen}
              />
              <Stack.Screen name='StartScreen' component={StartScreen} />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
              <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
              <Stack.Screen
                name='InformationScreen'
                component={InformationScreen}
              />

              <Stack.Screen
                name='BookDayScreen'
                component={BookDayScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Choose your lucky day ',
                  headerTintColor: '#fff',
                  headerStyle: { backgroundColor: '#42488df5' },
                }}
              />
              <Stack.Screen
                name='BookTimeScreen'
                component={BookTimeScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Choose a time when to play',
                  headerTintColor: '#fff',
                  headerStyle: { backgroundColor: '#42488df5' },
                }}
              />
              <Stack.Screen
                name='ResetPasswordScreen'
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </StateProvider>
  );
}
