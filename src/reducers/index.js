import { combineReducers } from 'redux';

import meals from './meals';
import foods from './foods';
import authentication from './authentication';

export default combineReducers({ 
    meals,
    foods,
    authentication,
});