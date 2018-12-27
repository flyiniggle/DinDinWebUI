import { combineReducers } from 'redux';
import meals from 'Data/Reducers/mealsReducer';
import user from 'Data/Reducers/userReducer';


export const reducers = combineReducers({
    meals,
    user
});


export default reducers;