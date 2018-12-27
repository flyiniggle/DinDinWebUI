import * as actions from 'Data/ActionTypes/mealActionTypes';


export function setMeals(meals) {
    return { type: actions.SET_MEALS, meals };
}