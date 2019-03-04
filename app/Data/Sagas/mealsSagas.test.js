import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setMealMessages, setMeal, setMeals, startMealsLoading, endMealsLoading, startMealsWorking, endMealsWorking } from 'Data/ActionCreators/mealsActionCreators';
import dateString from 'UI/Formatting/dateString';

import { sendUpdateMeal, sendUseMeal, loadMeals } from './mealsSagas';

import { call, put } from 'redux-saga/effects';

describe('#Data #mealSagas', function() {
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

    describe('updateMeal', function() {
        it('should set the working state to true.', function() {
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
            const updates = { name: 'latke' };
            const expected = put(startMealsWorking());
            const mealUpdater = sendUpdateMeal({ meal, updates });

            expect(mealUpdater.next().value).toEqual(expected);
        });

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
            const updates = { name: 'latke' };
            const expectedMeal = {
                id: 4,
                name: 'latke',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = call(MealService.patch, meal.id, expectedMeal);
            const mealUpdater = sendUpdateMeal({ meal, updates });

            mealUpdater.next();

            const result = mealUpdater.next();

            expect(result.value).toEqual(expected);
        });

        it('should set the working state to false.', function() {
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
            const updates = { name: 'latke' };
            const expected = put(endMealsWorking());
            const mealUpdater = sendUpdateMeal({ meal, updates });

            mealUpdater.next();
            mealUpdater.next();

            expect(mealUpdater.next().value).toEqual(expected);
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
            const updates = { name: 'latke' };
            const expectedMeal = {
                id: 4,
                name: 'latke',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                lastUsed: '2018-01-01',
                usedCount: 3,
                notes: 'gonna use you!'
            };
            const expected = put(setMeal(expectedMeal));
            const mealUpdater = sendUpdateMeal({ meal, updates });
            const mockResponse = Result.ok(expectedMeal);

            mealUpdater.next();
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
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
            const updates = { name: 'latke' };
            const expected = put(setMealMessages(['yeah, that didn\'t work at all boyo.']));
            const mealUpdater = sendUpdateMeal({ meal, updates });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealUpdater.next();
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
        });
    });

    describe('sendUseMeal', function() {
        it('should set the working state to true.', function() {
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
            const mealUpdater = sendUseMeal({ meal });
            const expected = put(startMealsWorking());

            expect(mealUpdater.next().value).toEqual(expected);
        });

        it('should call the MealService patch API with the updated meal data.', function() {
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
            const expected = call(MealService.patch, meal.id, expectedMeal);
            const mealUpdater = sendUseMeal({ meal });

            mealUpdater.next();

            const result = mealUpdater.next();

            expect(result.value).toEqual(expected);
        });

        it('should set the working state to false.', function() {
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
            const mealUpdater = sendUseMeal({ meal });
            const expected = put(endMealsWorking());

            mealUpdater.next();
            mealUpdater.next();

            expect(mealUpdater.next().value).toEqual(expected);
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
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
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
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
        });
    });
});