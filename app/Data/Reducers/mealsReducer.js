import { eqProps, map, mergeDeepLeft, when } from 'ramda';
import * as actionTypes from 'Data/ActionTypes/mealsActionTypes';
import createReducer from 'Data/Lib/createReducer';
import safeGetProp from 'Business/Lib/safeGetProp';


const initialState = {
    meals: null,
    messages: null
};

export function setMeals(state, action) {
    const meals = safeGetProp('meals', action).unwrapOr([]);

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
    if (action.meal) {
        const meal = action.meal;
        const isMatchingMeal = eqProps('id', meal);
        const replaceMatchingMeal = when(isMatchingMeal, mergeDeepLeft(meal));
        const meals = map(replaceMatchingMeal, state.meals);

        return {
            ...state,
            meals
        };
    }

    return state;
}

const subReducers = {
    [actionTypes.SET_MEALS]: setMeals,
    [actionTypes.SET_MESSAGES]: setMealsMessages,
    [actionTypes.SET_MEAL]: setMeal
};

export default createReducer(initialState, subReducers);