import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import FoodCard from '../components/FoodCard';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFoods } from '../actions/foods';

const AddFoodScreen = () => {
  //const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const foods = useSelector(state => state.foods);
  const route = useRoute();
  const navigation = useNavigation();

  const [editingFoodId, setEditingFoodId] = useState(null);

  useEffect(() => {
    if (route.params?.newFood) {
      //handleAddFood(route.params.newFood);
      //dispatch(fetchFoods());
      dispatch(getFoods());
    }
  }, [route.params?.newFood, dispatch]);

  const toggleForm = (foodId) => {
    setEditingFoodId(foodId);
    setShowForm(!showForm);
  };

  // const toggleFormWithId = (id) => {
  //   setEditingFoodId(id);
  //   toggleForm();
  // };

  return (
    
    <View style={styles.container}>
      {showForm ? (
        <>
          <FoodForm onFormSubmit={toggleForm} editingFoodId={editingFoodId}/>
          <Button title="View Foods" onPress={toggleForm} />
        </>
      ) : (
        <>
          
          <FoodList foods={foods} onToggleForm={toggleForm}/>
          <Button title="Add Food" onPress={toggleForm} />
        </>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddFoodScreen;
