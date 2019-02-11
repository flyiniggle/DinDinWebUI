import * as actions from 'Data/ActionTypes/mealsActionTypes';


export function getMeals() {
    return { type: actions.GET_MEALS };
}

export function setMeals(meals) {
    return { type: actions.SET_MEALS, meals };
}

export function setMeal(meal) {
    return { type: actions.SET_MEAL, meal };
}

export function setMealMessages(messages = null) {
    return { type: actions.SET_MESSAGES, messages};
}

export function useMeal(meal) {
    return { type: actions.USE_MEAL, meal };
}

export function updateMeal(meal, updates = {}) {
    return {type: actions.UPDATE_MEAL, meal, updates };
}