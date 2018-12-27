import * as actions from 'Data/ActionTypes/mealsActionTypes';


export function setMeals(meals) {
    return { type: actions.SET_MEALS, meals };
}