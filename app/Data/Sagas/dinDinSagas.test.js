import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setMealMessages, setMeals, startMealsLoading, endMealsLoading } from 'Data/ActionCreators/mealsActionCreators';

import { loadMeals } from './dinDinSagas';

import { call, put } from 'redux-saga/effects';

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
});