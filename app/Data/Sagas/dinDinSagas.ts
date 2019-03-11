import MealService from 'Business/Meals/Service';
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import {
    setMealMessages,
    setMeals,
    startMealsLoading,
    endMealsLoading,
} from 'Data/ActionCreators/mealsActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';


export function* loadMeals() {
    yield put(startMealsLoading());

    const mealsResult = yield call(MealService.get);

    yield put(endMealsLoading());

    const action = mealsResult.match({
        Ok: setMeals,
        Err: setMealMessages
    });

    yield put(action);
}


export function* watchGetMeals() {
    yield takeEvery(mealActionTypes.GET_MEALS, loadMeals);
}