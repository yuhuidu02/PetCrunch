import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createFood, updateFood } from '../actions/foods';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// const FoodForm = ({ onAddFood }) => {
//     const [foodName, setFoodName] = useState('');

//     const handleSubmit = () => {
//         onAddFood({ foodName});
//         setFoodName('');
//     };

//     return (
//         <View style={styles.formContainer}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter food name"
//                 value={foodName}
//                 onChangeText={setFoodName}
//             />
//             <Button title="Add Food" onPress={handleSubmit} />
//         </View>
//     );
// };

function FoodForm() {
    const route = useRoute();
    const { selectedId } = route.params || {};
    const food = useSelector(state =>
        selectedId ? state.foods.find(food => food.id === selectedId) : null
    );
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
                foodName: food.foodName,
                brand: food.brand,
                category: food.category,
                purchasedTime: food.purchasedTime,
                expirationTime: food.expirationTime,
                protein: food.protein,
                fat: food.fat,
                fiber: food.fiber,
                ash: food.ash,
                phorphorus: food.phorphorus,
                magnesium: food.magnesium,
                calcium: food.calcium,
                sodium: food.sodium,
                ironppm: food.ironppm,
                manganeseppm: food.magnesium,
                copperppm: food.copperppm,
                chloride: food.chloride,
                selenium: food.selenium,
                iodingppm: food.iodingppm,
                carbs: food.carbs,
                ME: food.ME
            })
        };
    }, [food]);

    const onSubmit = () => {
        if (validateForm()) {
            if (selectedId) {
                //dispatch(updateFood(selectedId, { ...formValues, username }));
                dispatch(updateFood(selectedId, formValues));
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
        navigation.goBack();
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
            <View>
                <Text style={styles.title}>{selectedId ? "Editing" : "Share"} a Story</Text>
                <Text style={styles.label}>Food Name</Text>
                <TextInput 
                    //style={[styles.input, formErrors.foodName ? { borderColor: 'red' } : {}]}
                    //style={styles.input}
                    style={[
                        styles.input, 
                        formErrors && formErrors.foodName ? { borderColor: 'red' } : {}
                    ]}                    
                    value={formValues.foodName}
                    onChangeText={text => setFormValues({ ...formValues, foodName: text })}
                />
                {formErrors && formErrors.foodName && <Text style={styles.errorText}>{formErrors.foodName}</Text>}
                <Text style={styles.label}>Brand</Text>
                <TextInput 
                    style={styles.input}
                    value={formValues.brand}
                    onChangeText={text => setFormValues({ ...formValues, brand: text })}
                />
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={[styles.input, formErrors && formErrors.category ? { borderColor: 'red' } : {}]}
                    value={formValues.category}
                    onChangeText={text => setFormValues({ ...formValues, category: text })}
                />
                {formErrors && formErrors.category && <Text style={styles.errorText}>{formErrors.category}</Text>}
                <Text style={styles.label}>Purchased Time</Text>
                <TextInput 
                    style={styles.input}
                    value={formValues.purchasedTime}
                    onChangeText={text => setFormValues({ ...formValues, purchasedTime: text })}
                />
                <Text style={styles.label}>Expiration Time</Text>
                <TextInput 
                    style={styles.input}
                    value={formValues.expirationTime}
                    onChangeText={text => setFormValues({ ...formValues, expirationTime: text })}
                />
                <Text style={styles.label}>Protein</Text>
                <TextInput 
                    style={styles.input}
                    value={formValues.protein}
                    onChangeText={text => setFormValues({ ...formValues, protein: text })}
                />
                <Text style={styles.label}>Fat</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.fat}
                    onChangeText={text => setFormValues({ ...formValues, fat: text })}
                />
                <Text style={styles.label}>Fiber</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.fiber}
                    onChangeText={text => setFormValues({ ...formValues, fiber: text })}
                />
                <Text style={styles.label}>Ash</Text>  
                <TextInput
                    style={styles.input}
                    value={formValues.ash}
                    onChangeText={text => setFormValues({ ...formValues, ash: text })}
                />
                <Text style={styles.label}>Phosphorus</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.phosphorus}
                    onChangeText={text => setFormValues({ ...formValues, phosphorus: text })}
                />
                <Text style={styles.label}>Magnesium</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.magnesium}
                    onChangeText={text => setFormValues({ ...formValues, magnesium: text })}
                />
                <Text style={styles.label}>Calcium</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.calcium}
                    onChangeText={text => setFormValues({ ...formValues, calcium: text })}
                />
                <Text style={styles.label}>Sodium</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.sodium}
                    onChangeText={text => setFormValues({ ...formValues, sodium: text })}
                />
                <Text style={styles.label}>Ironppm</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.ironppm}
                    onChangeText={text => setFormValues({ ...formValues, ironppm: text })}
                />
                <Text style={styles.label}>Manganeseppm</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.manganeseppm}
                    onChangeText={text => setFormValues({ ...formValues, manganeseppm: text })}
                />
                <Text style={styles.label}>Copperppm</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.copperppm}
                    onChangeText={text => setFormValues({ ...formValues, copperppm: text })}
                />
                <Text style={styles.label}>Chloride</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.chloride}
                    onChangeText={text => setFormValues({ ...formValues, chloride: text })}
                />
                <Text style={styles.label}>Selenium</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.selenium}
                    onChangeText={text => setFormValues({ ...formValues, selenium: text })}
                />
                <Text style={styles.label}>Iodineppm</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.iodineppm}
                    onChangeText={text => setFormValues({ ...formValues, iodineppm: text })}
                />
                <Text style={styles.label}>Carbs</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.carbs}
                    onChangeText={text => setFormValues({ ...formValues, carbs: text })}
                />
                <Text style={styles.label}>ME</Text>
                <TextInput
                    style={styles.input}
                    value={formValues.ME}
                    onChangeText={text => setFormValues({ ...formValues, ME: text })}
                />
                <Button title="Share" onPress={onSubmit} />
                {selectedId && (
                    <Button title="Discard" onPress={reset} color="red"/>
                )}                
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