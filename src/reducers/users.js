import {
    FETCH_USER,
    UPDATE_USER,
    FETCH_USER_FAILURE,
    UPDATE_USER_FAILURE
} from '../constants/actionTypes';

const initialState = {
    data: null,
    error: null
};

const userReducer = (state = initialState, action) => {
    console.log('Reducers - users:', state, action);
    switch (action.type) {
        case FETCH_USER:
            return { ...state, data: action.payload, error: null };
        case UPDATE_USER:
            return { ...state, data: { ...state.data, ...action.payload }, error: null };
        case FETCH_USER_FAILURE:
        case UPDATE_USER_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default userReducer;