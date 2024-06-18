import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createFood, updateFood } from '../actions/foods';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function FoodForm({ onFormSubmit, editingFoodId}) {

    const route = useRoute();
    //const { selectedId } = route.params || {};
    const food = useSelector(state => {

        //selectedId ? state.foods.find(food => food.id === selectedId) : null
        //editingFoodId ? state.foods.find(food => food.id === editingFoodId) : null
        return editingFoodId ? state.foods.find(food => food._id === editingFoodId) : null
    });

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [formValues, setFormValues] = useState({
        foodName: '',
        brand: '',
        category: '',
        purchasedTime: '',
        expirationTime: '',
        protein: '',
        fat: '',
        fiber: '',
        ash: '',
        phorphorus: '',
        magnesium: '',
        calcium: '',
        sodium: '',
        ironppm: '',
        manganeseppm: '',
        copperppm: '',
        chloride: '',
        selenium: '',
        iodingppm: '',
        carbs: '',
        ME: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const requiredFields = ['foodName', 'category'];

    //const user = JSON.parse(localStorage.getItem('profile'));
    //const username = user?.result.username;

    useEffect(() => {
        if (food) {
            setFormValues({
                ...food
            })
        };
    }, [food]);

    const handleSubmit = () => {
        asyncSubmit();
    };

    const asyncSubmit = () => {
        if (validateForm()) {
            if (food) {
                //dispatch(updateFood(selectedId, { ...formValues, username }));
                dispatch(updateFood(editingFoodId, formValues));
            } else {
                //dispatch(createFood({ ...formValues, username }));
                dispatch(createFood(formValues));
            }
            //navigation.goBack();
            reset();
        } else {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please fill in all required fields.',
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        }
    }

    const reset = () => {
        setFormValues({
            foodName: '',
            brand: '',
            category: '',
            purchasedTime: '',
            expirationTime: '',
            protein: '',
            fat: '',
            fiber: '',
            ash: '',
            phorphorus: '',
            magnesium: '',
            calcium: '',
            sodium: '',
            ironppm: '',
            manganeseppm: '',
            copperppm: '',
            chloride: '',
            selenium: '',
            iodingppm: '',
            carbs: '',
            ME: ''
        });
        //navigation.goBack();
        //navigation.navigate('Add Food')
        onFormSubmit();
    };

    const validateForm = () => {
        let error = {};
        requiredFields.forEach(field => {
            if (!formValues[field]) {
                error = { ...error, [field]: 'This field is required' };
            }
        });
        setFormErrors(error);
        return Object.keys(error).length === 0;
    };

    const handleInputChange = (key, value) => {
        setFormValues(prev => ({ ...prev, [key]: value }));
    };

    // if (!user) {
    //     return (
    //         <Card>
    //             <Title>Welcome to PetCrunch!</Title>
    //             <Text>Please login or register for tracking what pets eat</Text>
    //         </Card>
    //     );
    // }

    return (
        <ScrollView>
            <View style={styles.formContainer}>
                <Text style={styles.title}>{editingFoodId ? "Edit Food" : "Add New Food"}</Text>
                {/* Iterate over each form field to create input fields */}
                {Object.keys(formValues).map(key => (
                    <View key={key}>
                        <Text style={styles.label}>{key.replace(/ppm/g, ' (ppm)').replace(/ME/g, 'Metabolic Energy (kcal/kg)')}</Text>
                        <TextInput
                            style={[
                                styles.input,
                                formErrors[key] ? { borderColor: 'red' } : {}
                            ]}
                            value={formValues[key]}
                            //onChangeText={(text) => setFormValues({ ...formValues, [key]: text })}
                            onChangeText={(text) => handleInputChange(key, text)}
                        />
                        {formErrors[key] && <Text style={styles.errorText}>{formErrors[key]}</Text>}
                    </View>
                ))}
                <Button title="Submit" onPress={handleSubmit} />
                {editingFoodId && <Button title="Cancel" onPress={reset} color="red" />}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 5
    },
    formContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,  // Adds rounded corners
        fontSize: 16      // Sets the font size
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
});

export default FoodForm;