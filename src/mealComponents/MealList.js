import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import dayjs from "dayjs";
import MealForm from "./MealForm";
import { getMeals, updateMeal, createMeal } from "../actions/meals";
import { getFoods } from "../actions/foods";
import { useSelector, useDispatch } from 'react-redux';

const MealList = ({ currentDate }) => {
    //const [meals, setMeals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingMealId, setEditingMealId] = useState(null);
    const dispatch = useDispatch();
    const meals = useSelector(state => state.meals);
    const foods = useSelector(state => state.foods);
    console.log("MealList", meals, foods)

    // useEffect(() => {
    //     const fetchMeals = async () => {
    //         const dailyMeals = await getMealsForDate(currentDate.format('YYYY-MM-DD'));
    //         setMeals(dailyMeals);
    //     };
    //     fetchMeals();
    // }, [currentDate]);

    // const getMealsForDate = (date) => {
    //     return [
    //         { _id: 1, foodName: "Dr.Elsey's Food", servings: "1/2 cup", completedServings: "1/2 cup", comsumedAt: "10:00 AM" },
    //         { _id: 2, foodName: "Chicken Heart Treats", servings: "1 bite", completedServings: "1 bite", comsumedAt: "12:00 PM" },
    //         { _id: 3 ,foodName: "Dr.Elsey's Food", servings: "1/2 cup", completedServings: "1/2 cup", comsumedAt: "6:00 PM"}
    //     ];
    // };
    useEffect(() => {
        dispatch(getMeals());
    }, [dispatch]);

    const toggleForm = (mealId = null) => {
        setEditingMealId(mealId)
        setShowForm(!showForm);
    };

    // const handleSubmit = (newMeal) => {
    //     if (editingMealId) {
    //         dispatch(updateMeal(editingFoodId, formValues));
    //     } else {
    //         dispatch(createMeal(formValues)
    //     }
    //     toggleForm(); 
    // };

    

    return (
        <View style={styles.container}>
            {showForm ? (
                <>
                    <MealForm toggleForm={toggleForm} editingMealId={editingMealId} />
                </>
            ) : (
                <>
                    <ScrollView style={styles.timeline}>
                        {meals.map((meal, index) => (
                            <View key={index} style={styles.mealItem}>
                                <Text style={styles.mealTime}>{meal.foodName}</Text>
                                <Text style={styles.mealName}>{meal.completedServings}</Text>
                                <Button title="Edit" onPress={() => toggleForm(meal._id)} />
                            </View>
                        ))}
                    </ScrollView>
                    <Button title="Add Meal" onPress={() => toggleForm()} />
                </>
            )}
        </View>
    );

    // return (
    //     <ScrollView style={styles.timeline}>
    //         {meals.map((meal, index) => (
    //             <View key={index} style={styles.mealItem}>
    //                 <Text style={styles.mealTime}>{meal.time}</Text>
    //                 <Text style={styles.mealName}>{meal.name}</Text>
    //             </View>
    //         ))}
    //     </ScrollView>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mealItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    mealTime: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    mealName: {
        fontSize: 14
    },
    timeline: {
        flex: 1
    }
});

export default MealList;