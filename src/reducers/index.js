import { combineReducers } from 'redux';

import meals from './meals';
import foods from './foods';
import authentication from './authentication';

const rootReducer = combineReducers({ 
    meals,
    foods,
    authentication,
});

export default rootReducer;