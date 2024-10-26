// screens/UserInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const UserInfoScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSaveInfo = async () => {
    if (!weight || !height || !age || !gender) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const userDoc = doc(db, 'userInfo', auth.currentUser.uid);
      await setDoc(userDoc, {
        email: auth.currentUser.email,
        weight: parseFloat(weight),
        height: parseFloat(height),
        age: parseInt(age),
        gender,
      });
      navigation.replace('Home'); // Navigate to Home after saving info
    } catch (error) {
      console.error('Error saving user info:', error);
      Alert.alert('Error', 'Failed to save user info');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Weight (in pounds)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Height (in inches)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Gender (M/F/Other)"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveInfo}>
        <Text style={styles.saveInfoButton}>Save Information</Text>
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
  saveInfoButton: {
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
    fontWeight: 'bold',
  },
});

export default UserInfoScreen;
