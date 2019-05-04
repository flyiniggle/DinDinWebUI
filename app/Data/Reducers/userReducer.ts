import * as actionTypes from 'Data/ActionTypes/userActionTypes';
import createReducer from 'Data/Lib/createReducer';
import { ISetUsernameAction, ISetEmailAction } from 'Data/ActionCreators/userActionCreators';


const initialState = {
    username: null,
    email: null
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


const subReducers = {
    [actionTypes.SET_EMAIL]: setEmail,
    [actionTypes.SET_USERNAME]: setUsername
};

export default createReducer(initialState, subReducers);