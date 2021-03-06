import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { endMealEditorLoading, startMealEditorLoading, setMealEditorMessages, acknowledgeUpdateMeal } from 'Data/ActionCreators/mealEditorActionCreators';
import dateString from 'UI/Formatting/dateString';
import { setMeal } from 'Data/ActionCreators/mealsActionCreators';
import updateMeal from 'Business/Meals/UpdateMeal/updateMeal';

import { sendUpdateMeal, sendUseMeal } from './mealEditorSagas';


import { call, put } from 'redux-saga/effects';


describe('#Data #mealSagas', function() {
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
            const expected = put(startMealEditorLoading());
            const mealUpdater = sendUpdateMeal({ meal, updates });

            expect(mealUpdater.next().value).toEqual(expected);
        });

        it('should call updateMeal with the meal data.', function() {
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
            const expected = call(updateMeal, meal, updates);
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
            const expected = put(endMealEditorLoading());
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

        it('should acknowledge success, if successful.', function() {
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
            const expected = put(acknowledgeUpdateMeal());
            const mealUpdater = sendUpdateMeal({ meal, updates });
            const mockResponse = Result.ok(expectedMeal);

            mealUpdater.next();
            mealUpdater.next();
            mealUpdater.next(mockResponse);
            mealUpdater.next();

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
            const expected = put(setMealEditorMessages(['yeah, that didn\'t work at all boyo.']));
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
            const expected = put(startMealEditorLoading());

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
            const expected = put(endMealEditorLoading());

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
            const expected = put(setMealEditorMessages(['yeah, that didn\'t work at all boyo.']));
            const mealUpdater = sendUseMeal({ meal });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealUpdater.next();
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
        });
    });
});