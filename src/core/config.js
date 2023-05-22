// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApps, getApp } from 'firebase/app';
import { Auth, getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBGHRiJ7F4xwT4GL9T5lOHCJU_qA6kOKuM',
  authDomain: 'sportyapp-de1c4.firebaseapp.com',
  projectId: 'sportyapp-de1c4',
  storageBucket: 'sportyapp-de1c4.appspot.com',
  messagingSenderId: '60831471665',
  appId: '1:60831471665:web:ae2f3c19c7a8b07da95d10',
};

let app;
// Initialize Firebase
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  // Initialize Auth with persistence
  const auth = getAuth(app);
  auth.setPersistence(getReactNativePersistence(AsyncStorage));
} else {
  app = getApp();
  // Get Auth instance from the existing app
  const auth = getAuth(app);
}

export const auth = getAuth(app);

export const ANDROID_GOOGLE_CLIENT_ID =
  '60831471665-sitv8k21o6nosh7upe7ae2ss5bmdelip.apps.googleusercontent.com';
export const IOS_GOOGLE_CLIENT_ID =
  '60831471665-tna0fj2qtp1lvptag29q3km31qnjtsal.apps.googleusercontent.com';
// export default app;
