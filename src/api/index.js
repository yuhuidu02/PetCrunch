import axios from 'axios';

const url = "http://localhost:5001/foods";

export const fetchFoods = async () => axios.get(url);
export const createFood = async (newFood) => axios.post(url, newFood);
export const updateFood = async (id, food) => axios.patch(`${url}/${id}`, food);
export const deleteFood = async (id) => axios.delete(`${url}/${id}`);
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