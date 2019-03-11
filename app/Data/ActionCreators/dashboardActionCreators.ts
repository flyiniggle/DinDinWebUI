import * as actions from 'Data/ActionTypes/dashboardActionTypes';
import Message from 'Business/Validation/Types/Message';
import IMeal from 'Business/Meals/Types/Meal';


export interface IUseMealAction {
    type: string,
    meal: IMeal
}

export function useMeal(meal: IMeal): IUseMealAction {
    return { type: actions.DASHBOARD_USE_MEAL, meal };
}


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


export function setDashboardMessages(messages: Message[] = null): ISetDashboardMessagesAction {
    return { type: actions.SET_DASHBOARD_MESSAGES, messages};
}