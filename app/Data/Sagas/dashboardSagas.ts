import MealService from 'Business/Meals/Service';
import useMeal from 'Business/Meals/useMeal';
import { setMeal } from 'Data/ActionCreators/mealsActionCreators';
import * as mealActionTypes from 'Data/ActionTypes/dashboardActionTypes';
import {
    IUseMealAction,
    useMeal as useMealActionCreator,
    startDashboardLoading,
    endDashboardLoading,
    setDashboardMessages
} from 'Data/ActionCreators/dashboardActionCreators';

import { call, put, takeEvery } from 'redux-saga/effects';


export function* sendUseMeal(action: IUseMealAction) {
    const meal = action.meal;
    const updatedMeal = useMeal(meal);

    yield put(startDashboardLoading());

    const updateResult = yield call(MealService.patch, meal.id, updatedMeal);

    yield put(endDashboardLoading());

    const nextAction = updateResult.match({
        Ok: setMeal,
        Err: setDashboardMessages
    });

    yield put(nextAction);
}

export function* watchUseMeal() {
    yield takeEvery(mealActionTypes.DASHBOARD_USE_MEAL, sendUseMeal);
}