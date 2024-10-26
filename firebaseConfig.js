// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);