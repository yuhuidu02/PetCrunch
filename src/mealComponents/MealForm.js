import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button, ScrollView, Platform, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createMeal, updateMeal } from "../actions/meals";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import DateTimePicker from '@react-native-community/datetimepicker';


function MealForm({ toggleForm, editingMealId }) {
    const route = useRoute();
    const meal = useSelector((state) => {
        return editingMealId ? state.meals.find((meal) => meal._id === editingMealId) : null;
    });
    
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

    const requiredFields = ["foodName", "completedServings"];
    
    useEffect(() => {
        if (meal) {
            setFormValues({
                ...meal,
        });
        }
    }, [meal]);
    
    const handleSubmit = () => {
        asyncSubmit();
    };
    
    const asyncSubmit = async () => {
        if (validateForm()) {
            if (meal) {
                dispatch(updateMeal(editingMealId, formValues));
            } else {
                dispatch(createMeal(formValues));
            }
            reset();
        } else {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please fill in all required fields",
            });
        }
    };

    const reset = () => {
        setFormValues({
            foodName: "",
            servings: "",
            completedServings: "",
            comsumedAt: ""
        });
        toggleForm();
    }
    
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
        setFormValues(prev => ({ ...prev, [key]: value }));
    };


    

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formValues.consumedAt;
        setDatePickerVisible(Platform.OS === 'ios');
        setFormValues(prev => ({ ...prev, consumedAt: currentDate }));
    };
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    
    
    return (
        <ScrollView style={styles.formContainer}>
            {Object.keys(formValues).map(key => {
                if (key !== 'consumedAt') {
                    return (
                        <View key={key}>
                            <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}</Text>
                            <TextInput
                                style={styles.input}
                                value={formValues[key]}
                                onChangeText={(text) => handleInputChange(key, text)}
                            />
                            {formErrors[key] && <Text style={styles.errorText}>{formErrors[key]}</Text>}
                        </View>
                    )
                }
            })}
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
            <Button title="Submit" onPress={handleSubmit} /> 
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 10,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        padding: 5,
        marginBottom: 10,
    },
    error: {
        color: "red",
    },
});

export default MealForm;