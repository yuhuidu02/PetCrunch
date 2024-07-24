import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Platform, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createMeal, updateMeal } from "../actions/meals";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getFoods } from "../actions/foods";

function MealForm({ toggleForm, editingMealId }) {
    const route = useRoute();
    const meal = useSelector((state) => {
        return editingMealId ? state.meals.find((meal) => meal._id === editingMealId) : null;
    });
    const foods = useSelector(state => state.foods);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [formValues, setFormValues] = useState({
        foodName: "",
        servings: "",
        completedServings: "",
        consumedAt: new Date()
    });
    const [formErrors, setFormErrors] = useState({});
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [query, setQuery] = useState("");

    const requiredFields = ["foodName", "completedServings"];

    useEffect(() => {
        console.log("Dispatching getFoods action");
        dispatch(getFoods());
        if (meal) {
            console.log("Meal found, setting form values", meal);
            setFormValues({
                ...meal,
            });
        }
    }, [meal, dispatch]);

    const handleSubmit = () => {
        console.log("Submitting form", formValues);
        asyncSubmit();
    };

    const asyncSubmit = async () => {
        if (validateForm()) {
            if (meal) {
                console.log("Updating meal", formValues);
                dispatch(updateMeal(editingMealId, formValues));
            } else {
                console.log("Creating new meal", formValues);
                dispatch(createMeal(formValues));
            }
            reset();
        } else {
            console.log("Validation failed", formErrors);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please fill in all required fields",
            });
        }
    };

    const reset = () => {
        console.log("Resetting form");
        setFormValues({
            foodName: "",
            servings: "",
            completedServings: "",
            consumedAt: new Date()
        });
        setQuery("");
        toggleForm();
    };

    const validateForm = () => {
        let errors = {};
        requiredFields.forEach((field) => {
            if (!formValues[field]) {
                errors[field] = "This field is required";
            }
        });
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (key, value) => {
        console.log(`Changing input ${key} to ${value}`);
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formValues.consumedAt;
        setDatePickerVisible(Platform.OS === 'ios');
        console.log("Date changed to", currentDate);
        setFormValues(prev => ({ ...prev, consumedAt: currentDate }));
    };

    const showDatePicker = () => {
        console.log("Showing date picker");
        setDatePickerVisible(true);
    };

    const filterFoods = (query) => {
        if (!query) {
            return [];
        }
        const regex = new RegExp(`${query.trim()}`, 'i');
        const filtered = foods.filter(food => food.foodName.search(regex) >= 0);
        console.log("Filtered foods", filtered);
        return filtered;
    };

    const filteredFoods = filterFoods(query);

    const renderFormInput = ({ item }) => (
        console.log("Rendering form input", item),
        <View key={item.key} style={styles.inputContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
                style={styles.input}
                value={formValues[item.key]}
                onChangeText={(text) => handleInputChange(item.key, text)}
            />
            {formErrors[item.key] && <Text style={styles.errorText}>{formErrors[item.key]}</Text>}
        </View>
    );

    const formInputs = [
        { key: 'servings', label: 'Servings' },
        { key: 'completedServings', label: 'Completed Servings' }
    ];

    return (
        <View style={styles.container}>
            <View style={styles.formWrapper}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Food Name</Text>
                    <TextInput
                        style={styles.input}
                        value={query}
                        onChangeText={(text) => {
                            console.log("Autocomplete input changed to", text);
                            setQuery(text);
                            handleInputChange('foodName', text);
                        }}
                    />
                </View>
                {filteredFoods.length > 0 && (
                    <View style={styles.dropdownWrapper}>
                        <FlatList
                            data={filteredFoods}
                            keyExtractor={(_, idx) => idx.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    console.log("Food selected", item.foodName);
                                    setQuery(item.foodName);
                                    handleInputChange('foodName', item.foodName);
                                }}>
                                    <Text style={styles.itemText}>{item.foodName}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.dropdownList}
                        />
                    </View>
                )}
                <FlatList
                    data={formInputs}
                    renderItem={renderFormInput}
                    keyExtractor={item => item.key}
                    ListFooterComponent={
                        <>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Consumed At</Text>
                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={showDatePicker}>
                                    <Text>{formValues.consumedAt ? formValues.consumedAt.toLocaleString() : 'Select a date and time'}</Text>
                                </TouchableOpacity>
                                {datePickerVisible && (
                                    <DateTimePicker
                                        value={formValues.consumedAt}
                                        mode="datetime"
                                        is24Hour={true}
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                                {formErrors.consumedAt && <Text style={styles.error}>{formErrors.consumedAt}</Text>}
                            </View>
                            <Button title="Submit" onPress={handleSubmit} />
                            <Button title="Cancel" onPress={reset} color="red" />
                        </>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    formWrapper: {
        zIndex: -1, // Lower zIndex for the form wrapper
    },
    formContainer: {
        padding: 10,
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
        position: 'relative', // Ensure it respects zIndex
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        position: 'relative', // Ensure it respects zIndex
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        position: 'relative', // Ensure it respects zIndex
    },
    error: {
        color: "red",
    },
    dropdownWrapper: {
        position: 'absolute',
        top: 60, // Adjust as needed to position the dropdown correctly
        left: 10,
        right: 10,
        zIndex: 2, // Ensure dropdown is above other elements
    },
    dropdownList: {
        maxHeight: 200,
        backgroundColor: '#fff',
        elevation: 3, // For Android to respect zIndex
    },
    itemText: {
        fontSize: 15,
        margin: 2,
        zIndex: 2, // Ensure text in dropdown is above other elements
        position: 'relative', // Ensure it respects zIndex
    }
});

export default MealForm;