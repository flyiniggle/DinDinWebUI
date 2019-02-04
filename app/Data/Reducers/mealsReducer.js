import { eqProps, map, mergeDeepLeft, when } from 'ramda';
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

export function setMeal(state, action) {
    const meal = action.meal;
    const isMatchingMeal = eqProps('id', meal);
    const replaceMatchingMeal = when(isMatchingMeal, mergeDeepLeft(meal));
    const meals = map(replaceMatchingMeal, state.meals);

    return {
        ...state,
        meals
    };
}

const subReducers = {
    [actionTypes.SET_MEALS]: setMeals,
    [actionTypes.SET_MESSAGES]: setMealsMessages,
    [actionTypes.SET_MEAL]: setMeal
};

export default createReducer(initialState, subReducers);