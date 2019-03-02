import { ISetDashboardMessagesAction } from 'Data/ActionCreators/dashboardActionCreators';
import * as actions from 'Data/ActionTypes/dashboardActionTypes';
import IDashboardState from 'Data/Reducers/Types/IDashboardState';
import createReducer from 'Data/Lib/createReducer';


const initialState: IDashboardState = {
    isLoading: false,
    messages: null
};

export function startDashboardLoading(state: IDashboardState): IDashboardState {
    return {
        ...state,
        isLoading: true
    }
}

export function endDashboardLoading(state: IDashboardState): IDashboardState {
    return {
        ...state,
        isLoading: false
    }
}

export function setDashboardMessages(state: IDashboardState, action: ISetDashboardMessagesAction): IDashboardState {
    const messages = action.messages;

    return {
        ...state,
        messages
    };
}

const subReducers = {
    [actions.START_DASHBOARD_LOADING]: setDashboardMessages,
    [actions.END_DASHBOARD_LOADING]: endDashboardLoading,
    [actions.SET_DASHBOARD_MESSAGES]: setDashboardMessages
}

export default createReducer(initialState, subReducers);


