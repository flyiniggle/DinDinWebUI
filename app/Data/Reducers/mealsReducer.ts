import { append, eqProps, map, mergeDeepLeft, when } from 'ramda';
import * as actionTypes from 'Data/ActionTypes/mealsActionTypes';
import createReducer from 'Data/Lib/createReducer';
import safeGetProp from 'Business/Lib/safeGetProp';
import IMealsState from './Types/IMealsState';
import { ISetMealAction, ISetMealMessagesAction, ISetMealsAction } from 'Data/ActionCreators/mealsActionCreators';
import IMeal from 'Business/Meals/Types/Meal';


const initialState: IMealsState = {
    meals: null,
    isLoading: false,
    messages: null
};

export function setMeals(state: IMealsState, action: ISetMealsAction): IMealsState {
    const meals = safeGetProp('meals', action).unwrapOr([]);

    return {
        ...state,
        meals
    };
}

export function setMeal(state: IMealsState, action: ISetMealAction): IMealsState {
    if (action.meal) {
        const meal = action.meal;
        const isMatchingMeal = eqProps('id', meal);
        const mealExists = state.meals.find(isMatchingMeal);
        const replaceMatchingMeal = map(when(isMatchingMeal, mergeDeepLeft(meal)));
        const addMeal = append(meal);
        const setter = mealExists ? replaceMatchingMeal : addMeal;
        const meals: IMeal[] = setter(state.meals);

        return {
            ...state,
            meals
        };
    }

    return state;
}

export function setMealsMessages(state: IMealsState, action: ISetMealMessagesAction): IMealsState {
    const messages = action.messages;

    return {
        ...state,
        messages
    };
}

export function startMealsLoading(state: IMealsState): IMealsState {
    return {
        ...state,
        isLoading: true
    }
}

export function endMealsLoading(state: IMealsState): IMealsState {
    return {
        ...state,
        isLoading: false
    }
}

const subReducers = {
    [actionTypes.SET_MEALS]: setMeals,
    [actionTypes.SET_MESSAGES]: setMealsMessages,
    [actionTypes.SET_MEAL]: setMeal,
    [actionTypes.START_MEALS_LOADING]: startMealsLoading,
    [actionTypes.END_MEALS_LOADING]: endMealsLoading
};

export default createReducer(initialState, subReducers);