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

    const filteredMeals = meals.filter(meal =>
        dayjs(meal.consumedAt).isSame(currentDate, 'day')
    );

    useEffect(() => {
        dispatch(getMeals());
    }, [dispatch]);

    const toggleForm = (mealId = null) => {
        setEditingMealId(mealId)
        setShowForm(!showForm);
    };

    return (
        <View style={styles.container}>
            {showForm ? (
                <>
                    <MealForm toggleForm={toggleForm} editingMealId={editingMealId} />
                </>
            ) : (
                <>
                    <ScrollView style={styles.timeline}>
                        {filteredMeals.map((meal, index) => (
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