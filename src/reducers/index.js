import { combineReducers } from 'redux';

import meals from './meals';
import foods from './foods';
import authentication from './authentication';
import users from './users';

const rootReducer = combineReducers({ 
    meals,
    foods,
    users,
    authentication,
});

export default rootReducer;