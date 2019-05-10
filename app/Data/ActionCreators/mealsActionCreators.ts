import * as actions from 'Data/ActionTypes/mealsActionTypes';
import Meal from 'Business/Meals/Types/Meal';
import Message from 'Business/Validation/Types/Message';


export interface IGetMealsAction {
    type: string
}

export function getMeals(): IGetMealsAction {
    return { type: actions.GET_MEALS };
}


export interface ISetMealsAction {
    type: string,
    meals: Meal[]
}

export function setMeals(meals: Meal[]): ISetMealsAction {
    return { type: actions.SET_MEALS, meals };
}


export interface ISetMealAction {
    type: string,
    meal: Meal
}

export function setMeal(meal: Meal): ISetMealAction {
    return { type: actions.SET_MEAL, meal };
}


export interface ISetMealMessagesAction {
    type: string,
    messages: Message[] | null
}

export function setMealMessages(messages: Message[] = null): ISetMealMessagesAction {
    return { type: actions.SET_MESSAGES, messages};
}


export interface IUseMealAction {
    type: string,
    meal: Meal
}

export function useMeal(meal: Meal): IUseMealAction {
    return { type: actions.USE_MEAL, meal };
}

export interface IUpdateMealAction {
    type: string,
    meal: Meal,
    updates: Partial<Meal>
}

export function updateMeal(meal: Meal, updates: Partial<Meal> = {}): IUpdateMealAction {
    return {type: actions.UPDATE_MEAL, meal, updates };
}


export interface IStartMealsLoading {
    type: string
}

export function startMealsLoading(): IStartMealsLoading {
    return { type: actions.START_MEALS_LOADING };
}


export interface IEndMealsLoading {
    type: string
}

export function endMealsLoading(): IEndMealsLoading {
    return { type: actions.END_MEALS_LOADING };
}


export interface IStartMealsWorking {
    type: string
}

export function startMealsWorking(): IStartMealsWorking {
    return { type: actions.START_MEALS_WORKING };
}


export interface IEndMealsWorking {
    type: string
}

export function endMealsWorking(): IEndMealsWorking {
    return { type: actions.END_MEALS_WORKING };
}
