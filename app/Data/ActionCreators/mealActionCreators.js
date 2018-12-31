import * as actions from 'Data/ActionTypes/mealsActionTypes';


export function getMeals() {
    return { type: actions.GET_MEALS };
}

export function setMeals(meals) {
    return { type: actions.SET_MEALS, meals };
}

export function setMealMessages(messages = null) {
    return { type: actions.SET_MESSAGES, messages};
}