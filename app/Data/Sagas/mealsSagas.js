import MealService from 'Business/Meals/Service';
import updateMeal from 'Business/Meals/updateMeal';
import useMeal from 'Business/Meals/useMeal';
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import { setMealMessages, setMeals, setMeal, startMealsLoading, endMealsLoading, startMealsWorking, endMealsWorking } from 'Data/ActionCreators/mealsActionCreators';

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

export function* sendUpdateMeal(action) {
    const meal = action.meal;
    const updates = action.updates;
    const updatedMeal = updateMeal(meal, updates);

    yield put(startMealsWorking());

    const updateResult = yield call(MealService.patch, meal.id, updatedMeal);

    yield put(endMealsWorking());

    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setMealMessages
    });

    yield put(nextAction);
}

export function* sendUseMeal(action) {
    const meal = action.meal;
    const updatedMeal = useMeal(meal);

    yield put(startMealsWorking());

    const updateResult = yield call(MealService.patch, meal.id, updatedMeal);

    yield put(endMealsWorking());

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

export function* watchUpdateMeal() {
    yield takeEvery(mealActionTypes.UPDATE_MEAL, sendUpdateMeal);
}