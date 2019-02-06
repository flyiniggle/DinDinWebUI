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

export function* updateMeal(action) {
    const meal = action.meal;
    const updateResult = yield call(MealService.patch, meal.id, meal);
    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealsMessages
    });

    yield put(nextAction);
}

export function* sendUseMeal(action) {
    const updatedMeal = useMeal(action.meal);
    const nextAction = updateMeal.match({
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