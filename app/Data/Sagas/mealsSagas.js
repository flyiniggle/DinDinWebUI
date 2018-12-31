
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import { setMeals } from 'Data/ActionCreators/mealActionCreators';
import MealService from 'Business/Meals/Service';

import { call, put, takeEvery } from 'redux-saga/effects';

function* loadMeals() {
    const mealsResult = yield call(MealService.get);
    const action = mealsResult.match({
        Ok: setMeals,
        Err: () => setMeals([])
    });

    yield put(action);
}


export function* watchGetMeals() {
    yield takeEvery(mealActionTypes.GET_MEALS, loadMeals);
}