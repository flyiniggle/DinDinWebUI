import * as actions from 'Data/ActionTypes/mealEditorActionTypes';
import Message from 'Business/Validation/Types/Message';


export interface IStartMealEditorLoading {
    type: string
}

export function startMealEditorLoading(): IStartMealEditorLoading {
    return { type: actions.START_MEAL_EDITOR_LOADING };
}
export interface IEndMealEditorLoading {
    type: string
}

export function endMealEditorLoading(): IEndMealEditorLoading {
    return { type: actions.END_MEAL_EDITOR_LOADING };
}

export interface ISetMealEditorMessagesAction {
    type: string,
    messages: Message[] | null
}

export function setMealMessages(messages: Message[] = null): ISetMealEditorMessagesAction {
    return { type: actions.SET_MEAL_EDITOR_MESSAGES, messages};
}