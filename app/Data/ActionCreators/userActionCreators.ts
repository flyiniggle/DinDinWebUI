import * as userActions from "Data/ActionTypes/userActionTypes";
import IReduxAction from "Data/Lib/Types/IReduxAction";


export interface ISetUsernameAction extends IReduxAction {
    username: string
}

export function setUsername(username: string = null): ISetUsernameAction {
    return {
        type: userActions.SET_USERNAME,
        username
    }
}

export interface ISetEmailAction extends IReduxAction {
    email: string
}

export function setEmail(email: string = null): ISetEmailAction {
    return {
        type: userActions.SET_EMAIL,
        email
    }
}

export interface IGetProfileAction extends IReduxAction {}

export function getProfile(): IGetProfileAction {
    return { type: userActions.GET_PROFILE }
}

export interface IGetUsernamesListAction extends IReduxAction { }

export function getUsernamesList(): IGetUsernamesListAction {
    return { type: userActions.GET_USERNAMES_LIST }
}

export interface ISetUsernamesListAction extends IReduxAction { 
    usernamesList: string[]
}

export function setUsernamesList(usernames: string[] = []): ISetUsernamesListAction {
    return {
        type: userActions.SET_USERNAMES_LIST,
        usernamesList: usernames
    }
}