import MealService from 'Business/Meals/Service';
import * as mealCreatorActionTypes from 'Data/ActionTypes/mealCreatorActionTypes';
import {
    setMeal
} from 'Data/ActionCreators/mealsActionCreators';
import {
    ICreateMealAction,
    setMealCreatorMessages,
    startMealCreatorLoading,
    endMealCreatorLoading,
} from 'Data/ActionCreators/mealCreatorActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';


export function* sendCreateMeal(action: ICreateMealAction) {
    yield put(startMealCreatorLoading());
    const updateResult = yield call(MealService.post, action.meal);

    yield put(endMealCreatorLoading());

    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealCreatorMessages
    });

    yield put(nextAction);
}

export function* watchCreateMeal() {
    yield takeEvery(mealCreatorActionTypes.CREATE_MEAL, sendCreateMeal);
}