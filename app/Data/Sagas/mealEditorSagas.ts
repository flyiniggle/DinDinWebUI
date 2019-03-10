import MealService from 'Business/Meals/Service';
import updateMeal from 'Business/Meals/UpdateMeal/updateMeal';
import useMeal from 'Business/Meals/useMeal';
import { setMeal } from 'Data/ActionCreators/mealsActionCreators';
import * as mealActionTypes from 'Data/ActionTypes/mealEditorActionTypes';
import {
    IUseMealAction,
    IUpdateMealAction,
    startMealEditorLoading,
    endMealEditorLoading,
    setMealEditorMessages,
    acknowledgeUpdateMeal
} from 'Data/ActionCreators/mealEditorActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';


export function* sendUpdateMeal(action: IUpdateMealAction) {
    const { meal, updates } = action;

    yield put(startMealEditorLoading());

    const updateResult = yield call(updateMeal, meal, updates);

    yield put(endMealEditorLoading());

    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealEditorMessages
    });

    yield put(nextAction);

    if (updateResult.isOk()) {
        yield put(acknowledgeUpdateMeal());
    }
}

export function* sendUseMeal(action: IUseMealAction) {
    const meal = action.meal;
    const updatedMeal = useMeal(meal);

    yield put(startMealEditorLoading());

    const updateResult = yield call(MealService.patch, meal.id, updatedMeal);

    yield put(endMealEditorLoading());

    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealEditorMessages
    });

    yield put(nextAction);
}

export function* watchUseMeal() {
    yield takeEvery(mealActionTypes.MEAL_EDITOR_USE_MEAL, sendUseMeal);
}

export function* watchUpdateMeal() {
    yield takeEvery(mealActionTypes.MEAL_EDITOR_UPDATE_MEAL, sendUpdateMeal);
}