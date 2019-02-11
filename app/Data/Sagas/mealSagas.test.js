import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setMealMessages, setMeal, setMeals } from 'Data/ActionCreators/mealActionCreators';
import dateString from 'UI/Formatting/dateString';

import { updateMeal, sendUseMeal, loadMeals } from './mealsSagas';

import { call, put } from 'redux-saga/effects';

describe('#Data #mealSagas', function() {
    describe('loadMeals', function() {
        it('should call the MealService get API.', function() {
            const expected = call(MealService.get);
            const mealLoader = loadMeals();

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

            expect(mealLoader.next(mockResponse).value).toEqual(expected);
        });

        it('should set the meals messages state if unsuccessful.', function() {
            const expected = put(setMealMessages(['yeah, that didn\'t work at all boyo.']));
            const mealLoader = loadMeals();
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealLoader.next();
            expect(mealLoader.next(mockResponse).value).toEqual(expected);
        });
    });

    describe('updateMeal', function() {
        it('should call the MealService patch API with the meal data.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = call(MealService.patch, meal.id, meal);
            const mealUpdater = updateMeal({ meal });
            const result = mealUpdater.next();

            expect(result.value).toEqual(expected);
        });

        it('should set the meal state if successful.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = put(setMeal(meal));
            const mealUpdater = updateMeal({ meal });
            const mockResponse = Result.ok(meal);

            mealUpdater.next();

            expect(mealUpdater.next(mockResponse).value).toEqual(expected);
        });

        it('should set the meal messages state if it fails.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = put(setMealMessages(['yeah, that didn\'t work at all boyo.']));
            const mealUpdater = updateMeal({ meal });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealUpdater.next();

            expect(mealUpdater.next(mockResponse).value).toEqual(expected);
        });
    });

    describe('sendUseMeal', function() {
        it('should do should call the MealService patch API with the updated meal data.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const today = dateString.store(new Date());
            const expectedMeal = { lastUsed: today, usedCount: 4 };
            const expected = call(MealService.patch, expectedMeal.id, expectedMeal);
            const mealUpdater = sendUseMeal({ meal });
            const result = mealUpdater.next();

            expect(result.value).toEqual(expected);
        });

        it('should set the meal state if successful.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const today = dateString.store(new Date());
            const updatedMeal = { ...meal, lastUsed: today, usedCount: 4 };
            const expected = put(setMeal(updatedMeal));
            const mealUpdater = sendUseMeal({ meal });
            const mockResponse = Result.ok(updatedMeal);

            mealUpdater.next();

            expect(mealUpdater.next(mockResponse).value).toEqual(expected);
        });

        it('should set the meal messages state if it fails.', function() {
            const meal = {
                id: 4,
                name: 'delish dish',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = put(setMealMessages(['yeah, that didn\'t work at all boyo.']));
            const mealUpdater = sendUseMeal({ meal });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealUpdater.next();

            expect(mealUpdater.next(mockResponse).value).toEqual(expected);
        });
    });
});