import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setMealMessages, setMeals, startMealsLoading, endMealsLoading } from 'Data/ActionCreators/mealsActionCreators';
import { GET_PROFILE } from 'Data/ActionTypes/userActionTypes';
import { setUsername, setEmail, setUsernamesList } from 'Data/ActionCreators/userActionCreators';
import ProfileService from 'Business/Users/Profile/Sevice';

import UsersService from 'Business/Users/Users/Service';
import { loadMeals, getProfile, getUsers } from './dinDinSagas';

import { call, put, take } from 'redux-saga/effects';

describe('#Data #dinDinSagas', function() {
    describe('loadMeals', function() {
        it('should set the loading state to true.', function() {
            const expected = put(startMealsLoading());
            const mealLoader = loadMeals();

            expect(mealLoader.next().value).toEqual(expected);
        });

        it('should call the MealService get API.', function() {
            const expected = call(MealService.get);
            const mealLoader = loadMeals();

            mealLoader.next();
            expect(mealLoader.next().value).toEqual(expected);
        });

        it('should set the loading state to false.', function() {
            const expected = put(endMealsLoading());
            const mealLoader = loadMeals();

            mealLoader.next();
            mealLoader.next();
            expect(mealLoader.next().value).toEqual(expected);
        });

        it('should call set meals if successful.', function() {
            const meals = [
                {
                    id: 4,
                    name: 'delish dish',
                    owner: 'jamal',
                    taste: 5,
                    difficulty: 4,
                    lastUsed: '2018-01-01',
                    usedCount: 3,
                    notes: 'gonna use you!'
                },
                {
                    id: 4,
                    name: 'curry',
                    owner: 'nick',
                    taste: 3,
                    difficulty: 3,
                    lastUsed: '2018-01-01',
                    usedCount: 9,
                    notes: 'doesn\'t really matter what kind of curry. it\'s all the same.'
                },
                {
                    id: 7,
                    name: 'chili colorado',
                    owner: 'francesco',
                    taste: 5,
                    difficulty: 5,
                    lastUsed: '2019-05-01',
                    usedCount: 3,
                    notes: 'so colory'
                }
            ];
            const expected = put(setMeals(meals));
            const mockResponse = Result.ok(meals);
            const mealLoader = loadMeals();

            mealLoader.next();
            mealLoader.next();
            mealLoader.next(mockResponse);

            expect(mealLoader.next().value).toEqual(expected);
        });

        it('should set the meals messages state if unsuccessful.', function() {
            const expected = put(setMealMessages(['yeah, that didn\'t work at all boyo.']));
            const mealLoader = loadMeals();
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealLoader.next();
            mealLoader.next();
            mealLoader.next(mockResponse);

            expect(mealLoader.next().value).toEqual(expected);
        });
    });

    describe('getProfile', function() {
        it('should set the username and user email.', function() {
            const testProfile = {
                username: 'miguel',
                email: 'miguel@rest.com'
            };
            const testResult = Result.ok(testProfile);
            const expectedFirstAction = take(GET_PROFILE);
            const expectedSecondAction = call(ProfileService.get);
            const expectedThirdAction = put(setUsername(testProfile.username));
            const expectedFourthAction = put(setEmail(testProfile.email));
            const profileLoader = getProfile();

            expect(profileLoader.next().value).toEqual(expectedFirstAction);
            expect(profileLoader.next().value).toEqual(expectedSecondAction);
            expect(profileLoader.next(testResult).value).toEqual(expectedThirdAction);
            expect(profileLoader.next().value).toEqual(expectedFourthAction);
        });
    });

    describe('getUsers', function() {
        it('should load a list of active users names.', function() {
            const testNames = ['fooddude', 'muffinman', 'bakingqueen'];
            const testResult = Result.ok(testNames);
            const expectedFirstAction = call(UsersService.get);
            const expectedSecondAction = put(setUsernamesList(testNames));
            const userNamesListLoader = getUsers();

            expect(userNamesListLoader.next().value).toEqual(expectedFirstAction);
            expect(userNamesListLoader.next(testResult).value).toEqual(expectedSecondAction);
        });
    });
});