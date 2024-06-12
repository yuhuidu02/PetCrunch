const foodReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_FOODS":
            return action.payload;
        case "CREATE_FOOD":
            return [...state, action.payload];
        case "UPDATE_FOOD":
            return state.map(food => food._id === action.payload._id ? action.payload : food);
        case "DELETE_FOOD":
            return state.filter(food => food._id !== action.payload);
        default:
            return state;
    }
};

export default foodReducer;