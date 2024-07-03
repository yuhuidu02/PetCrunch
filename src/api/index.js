import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001' });

api.interceptors.request.use(async (req) => {
    try {
        const profile = await AsyncStorage.getItem('profile');
        if (profile) {
            req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
        }
    } catch (error) {
        console.error("Failed to retrieve profile:", error);
    }
    req.headers['Content-Type'] = 'application/json';
    return req;
});

export const fetchFoods = () => api.get('/foods');
export const createFood = (newFood) => api.post('/foods', newFood);
export const updateFood = (id, food) => api.patch(`/foods/${id}`, food);
export const deleteFood = (id) => api.delete(`/foods/${id}`);

export const fetchMeals = () => api.get('/meals');
export const createMeal = (newMeal) => api.post('/meals', newMeal);
export const updateMeal = (id, meal) => api.patch(`/meals/${id}`, meal);
export const deleteMeal = (id) => api.delete(`/meals/${id}`);

export const logIn = (formValues) => api.post('/users/login', formValues);
export const signUp = (formValues) => api.post('/users/signup', formValues);

export const getUserById = (userId) => api.get(`/users/${userId}`);
//export const fetchUser = (userId) => api.get('/users/');
export const updateUser = (userId, user) => api.patch(`/users/${userId}`, user);