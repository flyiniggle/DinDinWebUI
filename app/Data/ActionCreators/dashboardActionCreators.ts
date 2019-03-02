import * as actions from 'Data/ActionTypes/dashboardActionTypes';
import Message from 'Business/Validation/Types/Message';


export interface IStartDashboardLoading {
    type: string
}

export function startDashboardLoading(): IStartDashboardLoading {
    return { type: actions.START_DASHBOARD_LOADING };
}
export interface IEndDashboardLoading {
    type: string
}

export function endDashboardLoading(): IEndDashboardLoading {
    return { type: actions.END_DASHBOARD_LOADING };
}

export interface ISetDashboardMessagesAction {
    type: string,
    messages: Message[] | null
}

export function setMealMessages(messages: Message[] = null): ISetDashboardMessagesAction {
    return { type: actions.SET_DASHBOARD_MESSAGES, messages};
}