const mealReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_MEALS":
            return action.payload;
        case "CREATE_MEAL":
            return [...state, action.payload];
        case "UPDATE_MEAL":
            return state.map(meal => meal._id === action.payload._id ? action.payload : meal);
        case "DELETE_MEAL":
            return state.filter(meal => meal._id !== action.payload);
        default:
            return state;
    }
};

export default mealReducer;