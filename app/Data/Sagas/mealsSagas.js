import MealService from 'Business/Meals/Service';
import useMeal from 'Business/Meals/useMeal';
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import { setMealsMessages, setMeals, setMeal } from 'Data/ActionCreators/mealActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';

function* loadMeals() {
    const mealsResult = yield call(MealService.get);
    const action = mealsResult.match({
        Ok: setMeals,
        Err: setMealsMessages
    });

    yield put(action);
}

function* patchMeal(action) {
    const meal = action.meal;
    const patchResult = yield call(MealService.patch, meal.id, meal);
}

function* sendUseMeal(action) {
    const useMealResult = yield call(useMeal, action.meal);
    const nextAction = useMealResult.match({
        Ok: setMeal,
        Err: setMealsMessages
    });

    yield put(nextAction);
}

export function* watchGetMeals() {
    yield takeEvery(mealActionTypes.GET_MEALS, loadMeals);
}

export function* watchUseMeal() {
    yield takeEvery(mealActionTypes.USE_MEAL, sendUseMeal);
}