import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FoodCard from "./FoodCard";

const FoodList = ({ foods }) => (
    console.log('FoodList', foods),
    <View style={styles.listContainer}>
        {foods.map((food, index) => (
            //<Text key={index}>{food.foodName}</Text>
            <FoodCard key={index} food={food} />
        ))}
    </View>
);

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    },
});

export default FoodList;