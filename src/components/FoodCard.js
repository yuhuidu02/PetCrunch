import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch } from "react-redux";
import { deleteFood } from "../actions/foods";
import { useNavigation } from "@react-navigation/native";

const FoodCard = ({ food, onToggleForm }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDelete = () => {
        console.log('Delete', food._id);
        dispatch(deleteFood(food._id));
    }

    const handleEdit = () => {
        //navigation.navigate('FoodForm', { selectedId: food.id });
        console.log('Edit', food);
        onToggleForm(food._id);
    }
    return (
        <View style={styles.foodContainer}>
            <Text>Name: {food.foodName}</Text>
            <Text>Category: {food.category}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={handleEdit} color="#007BFF" />
                <Button title="Delete" onPress={handleDelete} color="#FF6347" />
            </View>
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
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-around',
      width: '100%',
  },
});

export default FoodCard;