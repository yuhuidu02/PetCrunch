import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FoodList = ({ foods }) => (
    <View style={styles.listContainer}>
        {foods.map((food, index) => (
        <Text key={index}>{food.foodName}</Text>
        ))}
    </View>
);

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    },
});

export default FoodList;