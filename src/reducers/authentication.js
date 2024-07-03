import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authenticationReducer = (state = { authData: null }, action) => {
    console.log("Reducers - authentication:", state, action)
    // console.log("action", action.type)
    // console.log("action data", action?.data)
    switch (action.type) {
        case AUTHENTICATION:
            //localStorage.setItem("profile", JSON.stringify({...action?.data}));
            AsyncStorage.setItem("profile", JSON.stringify({...action?.data}));
            return {
                ...state,
                authData: action?.data
            }
        case LOGOUT:
            AsyncStorage.clear();

            return {
                ...state,
                authData: null
            }

        default:
            return state;
    }
}

export default authenticationReducer;
