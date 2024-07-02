// In HomeScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../AuthForm/AuthForm';
import Profile from '../homeComponents/profile';

const HomeScreen = () => {

  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {
    setIsLogin(true);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {!isLogin && <AuthForm onLoginSuccess={handleLoginSuccess} />}
      {isLogin && <Profile />}
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
