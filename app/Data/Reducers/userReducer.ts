import * as actionTypes from 'Data/ActionTypes/userActionTypes';
import createReducer from 'Data/Lib/createReducer';
import { ISetUsernameAction, ISetEmailAction, ISetUsernamesListAction } from 'Data/ActionCreators/userActionCreators';


const initialState = {
    username: null,
    email: null,
    usernamesList: []
};

export function setEmail(state, action: ISetEmailAction) {
    const email = action.email || null;

    return {
        ...state,
        email
    };
}

export function setUsername(state, action: ISetUsernameAction) {
    const username = action.username || null;

    return {
        ...state,
        username
    };
}

export function setUsernamesList(state, action: ISetUsernamesListAction) {
    const usernamesList = action.usernamesList;

    return {
        ...state,
        usernamesList
    }
}


const subReducers = {
    [actionTypes.SET_EMAIL]: setEmail,
    [actionTypes.SET_USERNAME]: setUsername,
    [actionTypes.SET_USERNAMES_LIST]:setUsernamesList
};

export default createReducer(initialState, subReducers);