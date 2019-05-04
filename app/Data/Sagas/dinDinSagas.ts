import { identity } from 'ramda';
import MealService from 'Business/Meals/Service';
import ProfileService from 'Business/Users/Profile/Sevice';
import * as mealActionTypes from 'Data/ActionTypes/mealsActionTypes';
import * as userActionTypes from 'Data/ActionTypes/userActionTypes';
import {
    setMealMessages,
    setMeals,
    startMealsLoading,
    endMealsLoading,
} from 'Data/ActionCreators/mealsActionCreators';
import {
    setUsername,
    setEmail,
    setUsernamesList
} from 'Data/ActionCreators/userActionCreators';

import { call, put, take, takeEvery } from 'redux-saga/effects';
import UsersService from 'Business/Users/Users/Service';


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

export function* getProfile() {
    yield take(userActionTypes.GET_PROFILE);

    const profile = yield call(ProfileService.get);
    
    const { username, email, errors } = profile.match({
        Ok: identity,
        Err: identity
    });

    yield put(setUsername(username));
    yield put(setEmail(email));
    //yield put(setMessages(errors));//errors
}

export function* getUsers() {
    const usernames = yield call(UsersService.get);
    const nextAction = usernames.match({
        Ok: setUsernamesList,
        Err: identity //setMessages
    });

    yield put(nextAction);

}

export function* watchGetUsers() {
    yield takeEvery(userActionTypes.GET_USERNAMES_LIST, getUsers);
}