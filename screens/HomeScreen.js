// screens/HomeScreen.js
import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { getFirestore, collection, addDoc, Timestamp } from '@firebase/firestore';

const db = getFirestore();

const blue = '#5acfe9';

//this is acutally the create new workout screen i can't rename it tho it goes cray cray
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
          timeStamp: Timestamp.now(),
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text 
        style={styles.title}>Enter your exercise information:
        </Text>
        
        {/*
        <TextInput
          style={styles.inputBox }
          placeholder="Exercise Name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
        */}

        <View>
          <Picker
            selectedValue={workoutName}
            onValueChange={(itemValue) => setWorkoutName(itemValue)}
          >
            <Picker.Item label="Bench Press" value="Bench Press" />
            <Picker.Item label="Push-Ups" value="Push-Ups" />
            <Picker.Item label="Dumbbell Chest Fly" value="Dumbbell Chest Fly" />
            <Picker.Item label="Pull-Ups" value="Pull-Ups" />
            <Picker.Item label="Rows" value="Rows" />
            <Picker.Item label="Lat Pull-Downs" value="Lat Pull-Downs" />
            <Picker.Item label="Shoulder Press" value="Shoulder Press" />
            <Picker.Item label="Lateral Raises" value="Lateral Raises" />
            <Picker.Item label="Face Pulls" value="Face Pulls" />
            <Picker.Item label="Bicep Curls" value="Bicep Curls" />
            <Picker.Item label="Chin-Ups" value="Chin-Ups" />
            <Picker.Item label="Tricep Push-Downs" value="Tricep Push-Downs" />
            <Picker.Item label="Dips" value="Dips" />
            <Picker.Item label="Wrist Curls" value="Wrist Curls" />
            <Picker.Item label="Reverse Curls" value="Reverse Curls" />
            <Picker.Item label="Crunches" value="Crunches" />
            <Picker.Item label="Plank" value="Plank" />
            <Picker.Item label="Leg Raises" value="Leg Raises" />
            <Picker.Item label="Russian Twists" value="Russian Twists" />
            <Picker.Item label="Side Plank" value="Side Plank" />
            <Picker.Item label="Hyperextensions" value="Hyperextensions" />
            <Picker.Item label="Deadlifts" value="Deadlifts" />
            <Picker.Item label="Squats" value="Squats" />
            <Picker.Item label="Lunges" value="Lunges" />
            <Picker.Item label="Leg Extensions" value="Leg Extensions" />
            <Picker.Item label="Hamstring Curls" value="Hamstring Curls" />
            <Picker.Item label="Hip Thrusts" value="Hip Thrusts" />
            <Picker.Item label="Glute Bridges" value="Glute Bridges" />
            <Picker.Item label="Calf Raises" value="Calf Raises" />
          </Picker>
        </View>

        <TextInput
          style={styles.inputBox }
          placeholder="Number of Reps"
          value={numReps}
          onChangeText={setNumReps}
          keyboardType="numeric"
        />

        <View style={styles.switchContainer}>
          <Text 
            style={styles.switchLabel}>Does this exercise include weights?
          </Text>
          <Switch
            trackColor={{ true: blue }} //blue if switch is on
            ios_backgroundColor="#909090" //gray if switch is off
            value={usesWeight}
            onValueChange={setUsesWeight}
          />
        </View>

        {/* Conditionally render the numPounds input based on usesWeight */}
        {usesWeight && (
          <TextInput
            style={styles.inputBox }
            placeholder="Weight (in pounds)"
            value={numPounds}
            onChangeText={setNumPounds}
            keyboardType="numeric"
          />
        )}

        <TouchableOpacity
          style={styles.newWorkoutButton}
          onPress={recordWorkout}
          >
          <Text 
            style={styles.buttonText}>Create New Workout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignOut}
        >
          <Text 
          style={styles.buttonText}>Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 30,
    color: blue,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textAlignVertical: 'top',
  },
  email: {
    textAlign: 'center',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically
    marginBottom: 20, // Space below the switch
  },
  switchLabel: {
    marginRight: 10, // Space between label and switch
  },
  button: {
    backgroundColor: '#999',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 125,
  },
  newWorkoutButton: {
    backgroundColor: blue, //blue
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 80,
  },
  inputBox: {
    height: 50, // Increased height
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15, // space between inputs
    paddingHorizontal: 15,
    borderRadius: 5, // round the corners
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HomeScreen;