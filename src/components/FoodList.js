import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FoodCard from "./FoodCard";

const FoodList = ({ foods, onToggleForm }) => {
    if (!foods.length) {
        return (
            <View style={styles.emptyContainer}>
                <Text>No foods available. Add some!</Text>
            </View>
        );
    }
    // const toggleFormWithId = (id) => {
    //     onToggleForm(id);
    // }
    return (

        <FlatList
            data={foods}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <FoodCard food={item} onToggleForm={onToggleForm} />}
            contentContainerStyle={styles.listContainer}
        />
    )
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FoodList;