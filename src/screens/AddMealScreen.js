import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddMealScreen = () => (
  <View style={styles.container}>
    <Text>Add Meal</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddMealScreen;
