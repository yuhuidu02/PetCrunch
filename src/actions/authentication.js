import * as api from "../api";
import {
    AUTHENTICATION, LOGOUT, FETCH_USER, UPDATE_USER, FETCH_USER_FAILURE, UPDATE_USER_FAILURE
} from "../constants/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signup = (formValues, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formValues);
        console.log("signup data", data.result._id)
        await AsyncStorage.setItem('userId', data.result._id);
        dispatch({ 
            type: AUTHENTICATION, 
            data: data 
        });
        navigate("Home");
    } catch (error) {
        //console.log(error);
        console.error('Error during signup:', error);
        if (error.response) {
            // Handle errors thrown from the server, like a 400 or 500 series response.
            console.error('Server responded with:', error.response);
        }
        if (error.request) {
            // The request was made but no response was received.
            console.error('Request made, no response:', error.request);
        }
    }
};

const login = (formValues, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(formValues);
        await AsyncStorage.setItem('userId', data.result._id);
        dispatch({ 
            type: AUTHENTICATION, 
            data: data 
        });
        navigate("Home");
    } catch (error) {
        console.log(error);
    }
};

const authenticate = (authData) => async (dispatch) => {
    try {
        await AsyncStorage.setItem('profile', JSON.stringify(authData));
        dispatch({ type: AUTHENTICATION, data: authData });
    } catch (error) {
        console.error('Error during authentication:', error);
    }
};

const logout = () => async (dispatch) => {
    try {
        await AsyncStorage.clear();
        dispatch({ type: LOGOUT });
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

const getUserById = (userId) => async (dispatch) => {
    console.log("Action/getUserById", userId);
    try {
        //console.log("fetchUser try", userId);
        const response = await api.getUserById(userId);  // Make sure this function returns a promise
        const data = response.data;
        //const data = { id: userId, username: "John Doe" };
        //console.log("fetchUser data", data);
        dispatch({ type: FETCH_USER, payload: data });
    } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch({ type: FETCH_USER_FAILURE, error: error.response ? error.response.data : 'Unknown error' });
    }
};

const updateUser = (userId, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(userId, user);
        dispatch({ type: UPDATE_USER, data: data });
    } catch (error) {
        console.error('Error updating user data:', error);
        dispatch({ type: UPDATE_USER_FAILURE, error: error.response.data });
    }
};


export { login, signup, authenticate, logout, getUserById, updateUser};
