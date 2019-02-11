import MealService from 'Business/Meals/Service';
import useMeal from 'Business/Meals/useMeal';
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import { setMealMessages, setMeals, setMeal } from 'Data/ActionCreators/mealActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';

export function* loadMeals() {
    const mealsResult = yield call(MealService.get);
    const action = mealsResult.match({
        Ok: setMeals,
        Err: setMealMessages
    });

    yield put(action);
}

export function* updateMeal(action) {
    const meal = action.meal;
    const updateResult = yield call(MealService.patch, meal.id, meal);
    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealMessages
    });

    yield put(nextAction);
}

export function* sendUseMeal(action) {
    const meal = action.meal;
    const updatedMeal = useMeal(meal);
    const updateResult = yield call(MealService.patch, updatedMeal.id, updatedMeal);
    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealMessages
    });

    yield put(nextAction);
}

export function* watchGetMeals() {
    yield takeEvery(mealActionTypes.GET_MEALS, loadMeals);
}

export function* watchUseMeal() {
    yield takeEvery(mealActionTypes.USE_MEAL, sendUseMeal);
}