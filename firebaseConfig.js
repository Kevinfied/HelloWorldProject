// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmCo7HnTcSuRWkp-QKarKfB1wN4v-k7QU",
  authDomain: "fitness-f8861.firebaseapp.com",
  projectId: "fitness-f8861",
  storageBucket: "fitness-f8861.appspot.com",
  messagingSenderId: "346350237580",
  appId: "1:346350237580:web:fcd5efd0d8ebe3d26c88a9",
  measurementId: "G-3JC31TBG8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };