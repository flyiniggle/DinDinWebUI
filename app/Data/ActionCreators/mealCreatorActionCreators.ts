import * as actions from 'Data/ActionTypes/mealCreatorActionTypes';
import Message from 'Business/Validation/Types/Message';
import INewMeal from 'Business/Meals/Types/INewMeal';
import editableFields from 'Components/Meal/Types/editableFields';


export interface IUpdateNewMealAction {
    type: string,
    mealData: Partial<INewMeal>
}


export function updateNewMeal(field: editableFields, value: any): IUpdateNewMealAction {
    return {
        type: actions.UPDATE_NEW_MEAL,
        mealData: {
            [field]: value
        }
    }
}


export interface ICreateMealAction {
    type: string,
    meal: INewMeal
}

export function createMeal(meal: INewMeal): ICreateMealAction {
    return { type: actions.CREATE_MEAL, meal };
}


export interface IAcknowledgeCreateMeal {
    type: string
}

export function acknowledgeCreateMeal(): IAcknowledgeCreateMeal {
    return { type: actions.ACKNOWLEDGE_CREATE_MEAL }
}


export interface IAcknowledgeMessage {
    type: string
    id: string
}

export function acknowledgeMessage(id: string): IAcknowledgeMessage {
    return {
        type: actions.ACKNOWLEDGE_MEAL_CREATOR_MESSAGE,
        id
    }
}


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

export function setMealCreatorMessages(messages: Message[] = null): ISetMealCreatorMessagesAction {
    return { type: actions.SET_MEAL_CREATOR_MESSAGES, messages};
}