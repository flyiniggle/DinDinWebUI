import { identity } from 'ramda'
import createMeal from 'Business/Meals/createMeal';
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
import OkMessage from 'Business/Validation/OkMessage';
import Message from 'Business/Validation/Types/Message';
import { Result } from 'true-myth';
import IMeal from 'Business/Meals/Types/Meal';


export function* sendCreateMeal(action: ICreateMealAction) {
    yield put(startMealCreatorLoading());
    const updateResult: Result<IMeal, Message[]> = yield call(createMeal, action.meal);

    yield put(endMealCreatorLoading());

    const responseMessage: Message[] = updateResult.match({
        Ok: meal => [new OkMessage({ message: `You've created ${meal.name}!`})],
        Err: identity
    });

    if (updateResult.isOk()) {
        yield put(setMeal(updateResult.unsafelyUnwrap()));
    }

    yield put(setMealCreatorMessages(responseMessage));
}

export function* watchCreateMeal() {
    yield takeEvery(mealCreatorActionTypes.CREATE_MEAL, sendCreateMeal);
}