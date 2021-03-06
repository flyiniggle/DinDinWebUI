import * as actionTypes from 'Data/ActionTypes/userActionTypes';
import createReducer from 'Data/Lib/createReducer';


const initialState = {
    username: null,
    email: null
};

export function setEmail(state, action) {
    const email = action.payload || null;

    return {
        ...state,
        email
    };
}

export function setUsername(state, action) {
    const username = action.payload || null;

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