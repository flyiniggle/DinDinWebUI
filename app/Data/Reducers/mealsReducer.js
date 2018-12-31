import * as actionTypes from 'Data/ActionTypes/mealsActionTypes';
import createReducer from 'Data/Lib/createReducer';


const initialState = {
    meals: null,
    messages: null
};

export function setMeals(state, action) {
    const meals = action.meals;

    return {
        ...state,
        meals
    };
}

export function setMealsMessages(state, action) {
    const messages = action.messages;

    return {
        ...state,
        messages
    };
}

const subReducers = {
    [actionTypes.SET_MEALS]: setMeals,
    [actionTypes.SET_MESSAGES]: setMealsMessages
};

export default createReducer(initialState, subReducers);