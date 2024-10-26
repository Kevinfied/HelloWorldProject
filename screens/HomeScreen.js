// screens/HomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc, Timestamp } from '@firebase/firestore';
import { timeStamp } from 'console';
import { TextInput } from 'react-native-gesture-handler';

const db = getFirestore();

const HomeScreen = () => {

  const [workoutName, setWorkoutName] = useState('');
  const [numReps, setNumReps] = useState('');
  const [usesWeight, setUsesWeight] = useState(false);
  const [numPounds, setNumPounds] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const recordWorkout = async () => {
    if (workoutName && numReps && (!usesWeight || numPounds)) {
      try {
        await addDoc(collection(db, 'workouts'), {
          workoutName: workoutName,
          numReps: parseInt(numReps),
          usesWeight: usesWeight,
          numPounds: usesWeight ? parseInt(numPounds) : 0,
          timeStamp: new Date(),
        });
        setWorkoutName(''); //clears input after adding workout
        setNumReps('');
        setUsesWeight(false);
        setNumPounds('');
        alert('Workout recorded!');

      } catch (error) {
        console.error('Error adding workout: ', error);
      }
    } else {
      alert('Please fill out all fields!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.email}>{auth.currentUser?.email}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Exercise Name"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      <TextInput
        style={styles.input}
        placeholder="Reps"
        value={numReps}
        onChangeText={setNumReps}
        keyboardType="numeric"
      />

      <Button
        onPress={recordWorkout}
        title="New Workout"
        color="#841584"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  email: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;