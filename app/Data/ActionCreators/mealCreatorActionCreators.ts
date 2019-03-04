import * as actions from 'Data/ActionTypes/mealCreatorActionTypes';
import Message from 'Business/Validation/Types/Message';
import INewMeal from 'Business/Meals/Types/NewMeal';


export interface ICreateMealAction {
    type: string,
    meal: INewMeal
}

export function createMeal(meal: INewMeal): ICreateMealAction {
    return { type: actions.CREATE_MEAL, meal };
}


export interface IStartMealCreatorLoading {
    type: string
}

export function startMealCreatorLoading(): IStartMealCreatorLoading {
    debugger
    return { type: actions.START_MEAL_CREATOR_LOADING };
}


export interface IEndMealCreatorLoading {
    type: string
}

export function endMealCreatorLoading(): IEndMealCreatorLoading {
    return { type: actions.END_MEAL_CREATOR_LOADING };
}

export interface ISetMealCreatorMessagesAction {
    type: string,
    messages: Message[] | null
}

export function setMealCreatorMessages(messages: Message[] = null): ISetMealCreatorMessagesAction {
    return { type: actions.SET_MEAL_CREATOR_MESSAGES, messages};
}