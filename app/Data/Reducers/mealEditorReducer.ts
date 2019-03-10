import { ISetMealEditorMessagesAction, IAcknowledgeMealEditorMessage } from 'Data/ActionCreators/mealEditorActionCreators';
import * as actions from 'Data/ActionTypes/mealEditorActionTypes';
import IMealEditorState from 'Data/Reducers/Types/IMealEditorState';
import createReducer from 'Data/Lib/createReducer';


const initialState: IMealEditorState = {
    isLoading: false,
    messages: null
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


export function acknowledgeMessage(state: IMealEditorState, action: IAcknowledgeMealEditorMessage): IMealEditorState {
    return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
    }
}


const subReducers = {
    [actions.START_MEAL_EDITOR_LOADING]: startMealEditorLoading,
    [actions.END_MEAL_EDITOR_LOADING]: endMealEditorLoading,
    [actions.SET_MEAL_EDITOR_MESSAGES]: setMealEditorMessages,
    [actions.MEAL_EDITOR_ACKNOWLEDGE_MESSAGE]: acknowledgeMessage
}

export default createReducer(initialState, subReducers);


