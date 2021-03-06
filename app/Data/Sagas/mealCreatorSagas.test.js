import { Result } from 'true-myth';
import { setMeal } from 'Data/ActionCreators/mealsActionCreators';
import { setMealCreatorMessages, startMealCreatorLoading, endMealCreatorLoading, acknowledgeCreateMeal } from 'Data/ActionCreators/mealCreatorActionCreators';
import createMeal from 'Business/Meals/CreateMeal/createMeal';

import { sendCreateMeal } from './mealCreatorSagas';

import { call, put } from 'redux-saga/effects';


describe('#Data #mealCreatorSagas', function() {
    describe('createMeal', function() {
        it('should set the working state to true.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expected = put(startMealCreatorLoading());
            const mealCreator = sendCreateMeal({ meal });

            expect(mealCreator.next().value).toEqual(expected);
        });

        it('should call the meal creation prcoess with the new meal data.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expected = call(createMeal, meal);
            const mealCreator = sendCreateMeal({ meal });

            mealCreator.next();

            const result = mealCreator.next();

            expect(result.value).toEqual(expected);
        });

        it('should set the working state to false.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expected = put(endMealCreatorLoading());
            const mealCreator = sendCreateMeal({ meal });

            mealCreator.next();
            mealCreator.next();

            expect(mealCreator.next().value).toEqual(expected);
        });

        it('should reset the meal creator state if successful.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expected = put(acknowledgeCreateMeal());
            const mealCreator = sendCreateMeal({ meal });
            const mockResponse = Result.ok({});

            mealCreator.next();
            mealCreator.next();
            mealCreator.next(mockResponse);

            expect(mealCreator.next().value).toEqual(expected);
        });

        it('should set the meal state if successful.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expectedMeal = {
                id: 4,
                name: 'latke',
                owner: 'jamal',
                taste: 5,
                difficulty: 4,
                usedCount: 0,
                notes: 'gonna use you!'
            };
            const expected = put(setMeal(expectedMeal));
            const mealCreator = sendCreateMeal({ meal });
            const mockResponse = Result.ok(expectedMeal);

            mealCreator.next();
            mealCreator.next();
            mealCreator.next(mockResponse);
            mealCreator.next();

            expect(mealCreator.next().value).toEqual(expected);
        });

        it('should set the meal messages state if it fails.', function() {
            const meal = {
                name: 'delish dish',
                taste: 5,
                difficulty: 4,
                notes: 'gonna use you!'
            };
            const expected = put(setMealCreatorMessages(['yeah, that didn\'t work at all boyo.']));
            const mealCreator = sendCreateMeal({ meal });
            const mockResponse = Result.err(['yeah, that didn\'t work at all boyo.']);

            mealCreator.next();
            mealCreator.next();
            mealCreator.next(mockResponse);

            expect(mealCreator.next().value).toEqual(expected);
        });
    });
});