import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setDashboardMessages, startDashboardLoading, endDashboardLoading } from 'Data/ActionCreators/dashboardActionCreators';
import dateString from 'UI/Formatting/dateString';
import { setMeal } from 'Data/ActionCreators/mealsActionCreators';

import { sendUseMeal } from './dashboardSagas';

import { call, put } from 'redux-saga/effects';

describe('#Data #dashboardSagas', function() {
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
            const expected = put(startDashboardLoading());

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
            const expected = put(endDashboardLoading());

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
            const expected = put(setDashboardMessages(['yeah, that didn\'t work at all boyo.']));
            const mealUpdater = sendUseMeal({ meal });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealUpdater.next();
            mealUpdater.next();
            mealUpdater.next(mockResponse);

            expect(mealUpdater.next().value).toEqual(expected);
        });
    });
});