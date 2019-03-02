import { ISetMealEditorMessagesAction } from 'Data/ActionCreators/mealEditorActionCreators';
import * as actions from 'Data/ActionTypes/mealEditorActionTypes';
import IMealEditorState from 'Data/Reducers/Types/IMealEditorState';
import createReducer from 'Data/Lib/createReducer';


const initialState: IMealEditorState = {
    isLoading: false,
    messages: []
};

export function startMealEditorLoading(state: IMealEditorState): IMealEditorState {
    return {
        ...state,
        isLoading: true
    }
}

export function endMealEditorLoading(state: IMealEditorState): IMealEditorState {
    return {
        ...state,
        isLoading: false
    }
}

export function setMealEditorMessages(state: IMealEditorState, action: ISetMealEditorMessagesAction): IMealEditorState {
    const messages = action.messages;

    return {
        ...state,
        messages
    };
}

const subReducers = {
    [actions.START_MEAL_EDITOR_LOADING]: setMealEditorMessages,
    [actions.END_MEAL_EDITOR_LOADING]: endMealEditorLoading,
    [actions.SET_MEAL_EDITOR_MESSAGES]: setMealEditorMessages
}

export default createReducer(initialState, subReducers);


