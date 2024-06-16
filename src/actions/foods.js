import * as api from "../api";

import {
    SET_LOADING,
    FETCH_ALL_FOODS,
    CREATE_FOOD,
    UPDATE_FOOD,
    DELETE_FOOD,
} from "../constants/actionTypes";

export const getFoods = () => async (dispatch) => {
    //dispatch({ type: SET_LOADING });
    try {
        const { data } = await api.fetchFoods();
        dispatch({ type: FETCH_ALL_FOODS, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createFood = (food) => async (dispatch) => {
    try {
        const { data } = await api.createFood(food);
        dispatch({ type: CREATE_FOOD, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateFood = (id, food) => async (dispatch) => {
    try {
        const { data } = await api.updateFood(id, food);
        dispatch({ type: UPDATE_FOOD, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteFood = (id) => async (dispatch) => {
    try {
        await api.deleteFood(id);
        dispatch({ type: DELETE_FOOD, payload: id });
    } catch (error) {
        console.log(error.message);
    }
}


    