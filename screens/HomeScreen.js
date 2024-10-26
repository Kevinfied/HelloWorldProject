// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // No need to navigate - App.js will handle this automatically
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome!
      </Text>
      <Text style={styles.userEmail}>
        {auth.currentUser?.email} is logged in
      </Text>
      <View style={styles.logoutButton}>
        <Button 
          title="Logout" 
          onPress={handleLogout}
          color="#ff6b6b"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  logoutButton: {
    width: '100%',
    maxWidth: 200,
  },
});