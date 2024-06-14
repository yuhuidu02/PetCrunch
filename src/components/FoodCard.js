import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FoodCard = ({ food }) => {
    return (
      <View style={styles.foodContainer}>
        <Text>Name: {food.foodName}</Text>
        <Text>Category: {food.category}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    foodContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FoodCard;