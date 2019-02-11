import * as Reducers from './mealsReducer';

describe('mealsReducer', function() {
    describe('setMeals', function() {
        it('should add meals to the state.', function() {
            const initialState = {
                someProp: 1
            };
            const action = {
                meals: [{id: 1}, {id: 2}]
            };
            const result = Reducers.setMeals(initialState, action);

            expect(result).toHaveProperty('meals', action.meals);
        });

        it('should set an empty array if no meals are provided.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = {};
            const result = Reducers.setMeals(initialState, action);

            expect(result).toHaveProperty('meals', []);
        });
    });

    describe('setMealsMessages', function() {
        it('should set a message.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { messages: ['OH NO GOD HELP US ALL']};
            const result = Reducers.setMealsMessages(initialState, action);

            expect(result).toHaveProperty('messages', action.messages);
        });

        it('should remove messages.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { };
            const result = Reducers.setMealsMessages(initialState, action);

            expect(result).toHaveProperty('messages', undefined);
        });
    });

    describe('setMeal', function() {
        it('should change the property of the matching meal.', function() {
            const initialState = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'nerds'},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };
            const action = {
                meal: { id: 3, name: 'skittles'}
            };
            const expected = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'skittles'},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };

            expect(Reducers.setMeal(initialState, action)).toEqual(expected);
        });

        it('should add a new property of the matching meal.', function() {
            const initialState = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'nerds'},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };
            const action = {
                meal: { id: 3, taste: 5}
            };
            const expected = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'nerds', taste: 5},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };

            expect(Reducers.setMeal(initialState, action)).toEqual(expected);
        });

        it('should add a new meal if no matching meal exists.', function() {
            const initialState = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'nerds'},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };
            const action = {
                meal: { id: 33, taste: 5}
            };
            const expected = {
                meals: [...initialState.meals, action.meal]
            };

            expect(Reducers.setMeal(initialState, action)).toEqual(expected);
        });

        it('should make no change if no meal is provided.', function() {
            const initialState = {
                meals: [
                    {id: 1, name: 'oobleck'},
                    {id: 2, name: 'bison'},
                    {id: 3, name: 'nerds'},
                    {id: 4, name: 'ice cream'},
                    {id: 5, name: 'chips'}
                ]
            };
            const action = {};

            expect(Reducers.setMeal(initialState, action)).toEqual(initialState);
        });
    });
});