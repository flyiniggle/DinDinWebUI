import { ISetMealCreatorMessagesAction, IAcknowledgeMessage } from 'Data/ActionCreators/mealCreatorActionCreators';
import * as actions from 'Data/ActionTypes/mealCreatorActionTypes';
import IMealCreatorState from 'Data/Reducers/Types/IMealCreatorState';
import createReducer from 'Data/Lib/createReducer';


const initialState: IMealCreatorState = {
    isDirty: false,
    isLoading: false,
    messages: null
};

export function acknowledgeCreateMeal(state: IMealCreatorState): IMealCreatorState {
    return {
        ...state,
        isDirty: false,
        isLoading: false
    }
}

export function startMealCreatorLoading(state: IMealCreatorState): IMealCreatorState {
    return {
        ...state,
        isLoading: true
    }
}

export function endMealCreatorLoading(state: IMealCreatorState): IMealCreatorState {
    return {
        ...state,
        isLoading: false
    }
}

export function setMealCreatorMessages(state: IMealCreatorState, action: ISetMealCreatorMessagesAction): IMealCreatorState {
    const messages = action.messages;

    return {
        ...state,
        messages
    };
}

export function acknowledgeMessage(state: IMealCreatorState, action: IAcknowledgeMessage): IMealCreatorState {
    return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
    }

}

const subReducers = {
    [actions.ACKNOWLEDGE_CREATE_MEAL]: acknowledgeCreateMeal,
    [actions.START_MEAL_CREATOR_LOADING]: startMealCreatorLoading,
    [actions.END_MEAL_CREATOR_LOADING]: endMealCreatorLoading,
    [actions.SET_MEAL_CREATOR_MESSAGES]: setMealCreatorMessages,
    [actions.ACKNOWLEDGE_MESSAGE]: acknowledgeMessage
}

export default createReducer(initialState, subReducers);


