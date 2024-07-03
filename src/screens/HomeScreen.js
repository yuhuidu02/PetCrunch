// In HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../AuthForm/AuthForm';
import Profile from '../homeComponents/userProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = (userId) => {
    setIsLogin(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();  // Clearing all AsyncStorage items including userId
      setIsLogin(false);  // Update state to reflect that user is no longer logged in
    } catch (error) {
      console.error('Failed to clear the async storage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {!isLogin && <AuthForm onLoginSuccess={handleLoginSuccess} />}
      {isLogin && <Profile onLogout={handleLogout} />}
    </View>
  )

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
