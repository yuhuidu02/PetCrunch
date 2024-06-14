import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FoodForm from '../components/FoodForm';
import FoodList from '../components/FoodList';
import FoodCard from '../components/FoodCard';
import { useRoute, useNavigation } from '@react-navigation/native';


// const AddFoodScreen = () => {
//   console.log('AddFoodScreen');
//   const [foods, setFoods] = useState([]);
//   const route = useRoute();
//   const navigation = useNavigation();

//   const handleAddFood = (food) => {
//       setFoods(currentFoods => [...currentFoods, food]);
//   };

//   useEffect(() => {
//     if (route.params?.newFood) {
//       handleAddFood(route.params.newFood);
//     }
//   }, [route.params?.newFood]);
    
//   return (
//       <View style={styles.container}>
//         <FoodForm onAddFood={handleAddFood} />
//         <FoodList foods={foods} />
//       </View>
//   );
    
// };

const AddFoodScreen = () => {
  console.log('AddFoodScreen');
  //const [foods, setFoods] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const foods = useSelector(state => state.foods);
  const route = useRoute();
  const navigation = useNavigation();

  // const handleAddFood = (food) => {
  //   console.log("Adding food", food)
  //   setFoods(currentFoods => [...currentFoods, food]);
  //   setShowForm(false); // Automatically switch to FoodList after adding food
  // };

  useEffect(() => {
    if (route.params?.newFood) {
      //handleAddFood(route.params.newFood);
      dispatch(fetchFoods());
    }
  }, [route.params?.newFood, dispatch]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    
    <View style={styles.container}>
      {showForm ? (
        <>
          <FoodForm />
          <Button title="View Foods" onPress={toggleForm} />
        </>
      ) : (
        <>
          
          <FoodList foods={foods} />
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
