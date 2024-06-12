import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import { useRoute, useNavigation } from '@react-navigation/native';

const AddFoodScreen = () => {
  console.log('AddFoodScreen');
  const [foods, setFoods] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  const handleAddFood = (food) => {
      setFoods(currentFoods => [...currentFoods, food]);
  };

  useEffect(() => {
    if (route.params?.newFood) {
      handleAddFood(route.params.newFood);
    }
  }, [route.params?.newFood]);
    
  return (
      <View style={styles.container}>
        <FoodForm onAddFood={handleAddFood} />
        <FoodList foods={foods} />
      </View>
  );
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddFoodScreen;
