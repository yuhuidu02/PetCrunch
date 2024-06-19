import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import dayjs from "dayjs";
import MealForm from "./MealForm";
import { getMeals, updateMeal, createMeal, deleteMeal } from "../actions/meals";
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

    const filteredMeals = meals
        .filter(meal => dayjs(meal.consumedAt).isSame(currentDate, 'day'))
        .sort((a, b) => dayjs(a.consumedAt).isAfter(dayjs(b.consumedAt)) ? 1 : -1);
        

    useEffect(() => {
        dispatch(getMeals());
    }, [dispatch]);

    const toggleForm = (mealId = null) => {
        setEditingMealId(mealId)
        setShowForm(!showForm);
    };

    const handleDelete = (id) => {
        dispatch(deleteMeal(id));
    }

    const foodCategoryMap = foods.reduce((map, food) => {
        map[food.foodName] = food.category;
        return map;
    }, {});

    const getCategoryColor = (foodName) => {
        console.log("foodName", foodName)
        const category = foodCategoryMap[foodName];
        console.log("category", category)
        switch (category) {
            case 'Wet Food':
                return '#fae7b5'; // Banana Mania
            case 'Supplement':
                return '#ace1af'; // Celadon
            case 'Treats':
                return '#bcd4e6'; // Pale Aqua
            default:
                return '#FFFFFF'; // White

        }
    }

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
                            <View key={index} style={[styles.mealItem, { backgroundColor: getCategoryColor(meal.foodName) }]}>
                                {/* <Text style={styles.mealTime}>{meal.foodName}</Text>
                                <Text style={styles.mealName}>{meal.completedServings}</Text> */}
                                <View style={styles.itemContent}>
                                    <Text style={styles.time}>{dayjs(meal.consumedAt).format('h:mm A')}</Text>
                                    <Text style={styles.description}>{meal.foodName} - Completed {meal.completedServings} out of {meal.servings} </Text>
                                </View>
                                <View style={styles.circle} />
                                <View style={styles.line} />
                                <View style={styles.buttonContainer}>
                                    <Button title="Edit" onPress={() => toggleForm(meal._id)} color="#007BFF" />
                                    <Button title="Delete" onPress={() => handleDelete(meal._id)} color="#FF6347" />
                                </View>
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
        position: 'relative',
        marginBottom: 20,
        padding: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    itemContent: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
        backgroundColor: '#FFF',
    },
    mealTime: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    mealName: {
        fontSize: 14
    },
    timeline: {
        paddingLeft: 20,
        paddingRight: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        width: '100%',
    },
    time: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007BFF',
        position: 'absolute',
        left: 0,
        top: 10,
    },
    line: {
        position: 'absolute',
        left: 4.5, // half of the circle width to center the line
        top: 20, // bottom of the circle
        width: 1,
        height: 40, // height depending on your layout
        backgroundColor: '#CCC',
    },
});

export default MealList;