import axios from 'axios';

const url = "http://localhost:5001/foods";

export const fetchFoods = async () => axios.get(url);
export const createFood = async (newFood) => axios.post(url, newFood);
export const updateFood = async (id, food) => axios.patch(`${url}/${id}`, food);
export const deleteFood = async (id) => axios.delete(`${url}/${id}`);

const url_meals = "http://localhost:5001/meals";

export const fetchMeals = async () => axios.get(url_meals);
export const createMeal = async (newMeal) => axios.post(url_meals, newMeal);
export const updateMeal = async (id, meal) => axios.patch(`${url_meals}/${id}`, meal);
export const deleteMeal = async (id) => axios.delete(`${url_meals}/${id}`);

//const api = axios.create({ baseURL: 'http://localhost:5001' });

// api.interceptors.request.use((req) => {
//     const profile = localStorage.getItem('profile');
//     if (profile) {
//         req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
//     }
//     req.headers['Content-Type'] = 'application/json';
//     return req;
// });

// export const fetchFoods = () => api.get('/food');
// export const createFood = (newFood) => api.post('/food', newFood);
// export const updateFood = (id, updatedFood) => api.patch(`/food/${id}`, updatedFood);
// export const deleteFood = (id) => api.delete(`/food/${id}`);

// export const fetchMeals = () => api.get('/meal');
// export const createMeal = (newMeal) => api.post('/meal', newMeal);
// export const updateMeal = (id, updatedMeal) => api.patch(`/meal/${id}`, updatedMeal);
// export const deleteMeal = (id) => api.delete(`/meal/${id}`);

// export const logIn = (formData) => api.post('/user/login', formData);
// export const signUp = (formData) => api.post('/user/signup', formData);