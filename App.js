// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import SignIn from './screens/SignInScreen';
import SignUp from './screens/SignUpScreen';
import Home from './screens/HomeScreen';
import UserInfo from './screens/UserInfoScreen';
import { profile } from 'console';

const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'userInfo', user.uid));
        setProfileComplete(userDoc.exists());
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, [initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          profileComplete ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="UserInfo" component={UserInfoScreen} />
          )
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;