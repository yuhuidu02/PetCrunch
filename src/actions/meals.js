import * as api from "../api";

import {
    SET_LOADING,
    FETCH_ALL_MEALS,
    CREATE_MEAL,
    UPDATE_MEAL,
    DELETE_MEAL,
} from "../constants/actionTypes";

export const getMeals = () => async (dispatch) => {
    //dispatch({ type: SET_LOADING });
    try {
        const { data } = await api.fetchMeals();
        dispatch({ type: FETCH_ALL_MEALS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createMeal = (meal) => async (dispatch) => {
    console.log("Action-createMeal-1", meal)
    try {
        console.log("Action-createMeal-2", meal)
        const { data } = await api.createMeal(meal);
        console.log("Action-createMeal-3", meal)
        dispatch({ type: CREATE_MEAL, payload: data });
    } catch (error) {
        console.log("Error creating meal:", error);
    }
}

export const updateMeal = (id, meal) => async (dispatch) => {
    try {
        const { data } = await api.updateMeal(id, meal);
        dispatch({ type: UPDATE_MEAL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteMeal = (id) => async (dispatch) => {
    try {
        await api.deleteMeal(id);
        dispatch({ type: DELETE_MEAL, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}


    