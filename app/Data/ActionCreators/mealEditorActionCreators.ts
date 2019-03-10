import * as actions from 'Data/ActionTypes/mealEditorActionTypes';
import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';
import editableFields from 'Components/Meal/Types/editableFields';


export interface IUpdateMealAction {
    type: string,
    meal: IMeal
    updates: Partial<IMeal>
}

export function updateMeal(meal: IMeal, updates: Partial<IMeal>): IUpdateMealAction {
    return {
        type: actions.MEAL_EDITOR_UPDATE_MEAL,
        meal,
        updates
    }
}


export interface IUseMealAction {
    type: string,
    meal: IMeal
}

export function useMeal(meal: IMeal): IUseMealAction {
    return { type: actions.MEAL_EDITOR_USE_MEAL, meal };
}


export interface IAcknowledgeUpdateMeal {
    type: string
}

export function acknowledgeUpdateMeal(): IAcknowledgeUpdateMeal {
    return { type: actions.MEAL_EDITOR_ACKNOWLEDGE_UPDATE_MEAL }
}


export interface IAcknowledgeMealEditorMessage {
    type: string
    id: string
}

export function acknowledgeMealEditorMessage(id: string): IAcknowledgeMealEditorMessage {
    return {
        type: actions.MEAL_EDITOR_ACKNOWLEDGE_MESSAGE,
        id
    }
}


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

export function setMealEditorMessages(messages: Message[] = null): ISetMealEditorMessagesAction {
    return { type: actions.SET_MEAL_EDITOR_MESSAGES, messages};
}