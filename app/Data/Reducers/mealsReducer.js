import * as actionTypes from 'Data/ActionTypes/mealsActionTypes';
import createReducer from 'Data/createReducer';


const initialState = {
    meals: null
};

export function setMeals(state, action) {
    const meals = action.payload || [];

    return {
        ...state,
        meals
    };
}

const subReducers = {
    [actionTypes.GET_MEALS]: (state) => state,
    [actionTypes.SET_MEALS]: setMeals
};

export default createReducer(initialState, subReducers);