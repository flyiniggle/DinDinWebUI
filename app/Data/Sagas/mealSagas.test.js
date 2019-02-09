import { fake, replace } from 'sinon';
import { Result } from 'true-myth';
import MealService from 'Business/Meals/Service';
import { setMealsMessages, setMeals, setMeal } from 'Data/ActionCreators/mealActionCreators';

import { updateMeal } from './mealsSagas';

import { call, put, takeEvery } from 'redux-saga/effects';

describe('#Data #mealSagas', function() {
    describe('updateMeal', function() {
        it('should do should call the MealService patch API with the meal data.', function() {
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

        it('should forward to setMeal if patch was successful.', function() {
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
    });
});