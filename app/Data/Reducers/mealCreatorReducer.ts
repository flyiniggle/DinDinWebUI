import { ISetMealCreatorMessagesAction } from 'Data/ActionCreators/mealCreatorActionCreators';
import * as actions from 'Data/ActionTypes/mealCreatorActionTypes';
import IMealCreatorState from 'Data/Reducers/Types/IMealCreatorState';
import createReducer from 'Data/Lib/createReducer';


const initialState: IMealCreatorState = {
    isLoading: false,
    messages: []
};

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

const subReducers = {
    [actions.START_MEAL_CREATOR_LOADING]: setMealCreatorMessages,
    [actions.END_MEAL_CREATOR_LOADING]: endMealCreatorLoading,
    [actions.SET_MEAL_CREATOR_MESSAGES]: setMealCreatorMessages
}

export default createReducer(initialState, subReducers);


