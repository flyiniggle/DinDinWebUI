import * as Actions from './actionTypes';

export function getMeals(meals) {
    return { type: Actions.GET_MEALS, meals };
}