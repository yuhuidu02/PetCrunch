import * as api from "../api";
import {
    AUTHENTICATION, LOGOUT
} from "../constants/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const signup = (formValues, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formValues);
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
export { login, signup, authenticate, logout };
