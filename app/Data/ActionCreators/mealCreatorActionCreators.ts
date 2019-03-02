import * as actions from 'Data/ActionTypes/mealCreatorActionTypes';
import Message from 'Business/Validation/Types/Message';


export interface IStartMealCreatorLoading {
    type: string
}

export function startMealCreatorLoading(): IStartMealCreatorLoading {
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

export function setMealMessages(messages: Message[] = null): ISetMealCreatorMessagesAction {
    return { type: actions.SET_MEAL_CREATOR_MESSAGES, messages};
}