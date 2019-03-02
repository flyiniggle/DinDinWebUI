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

    describe('startMealsLoading', function() {
        it('should set the loading state to true.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.startMealsLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.startMealsLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', true);
            expect(result2).toHaveProperty('isLoading', true);
        });
    });

    describe('endMealsLoading', function() {
        it('should set the loading state to false.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.endMealsLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.endMealsLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', false);
            expect(result2).toHaveProperty('isLoading', false);
        });
    });

    describe('startMealsWorking', function() {
        it('should set the working state to true.', function() {
            const initialState1 = {
                isWorking: false,
                messages: []
            };
            const result1 = Reducers.startMealsWorking(initialState1);
            const initalState2 = {
                isWorking: true,
                message: []
            };
            const result2 = Reducers.startMealsWorking(initalState2);

            expect(result1).toHaveProperty('isWorking', true);
            expect(result2).toHaveProperty('isWorking', true);
        });
    });

    describe('endMealsWorking', function() {
        it('should set the working state to false.', function() {
            const initialState1 = {
                isWorking: false,
                messages: []
            };
            const result1 = Reducers.endMealsLoading(initialState1);
            const initalState2 = {
                isWorking: true,
                message: []
            };
            const result2 = Reducers.endMealsWorking(initalState2);

            expect(result1).toHaveProperty('isWorking', false);
            expect(result2).toHaveProperty('isWorking', false);
        });
    });
});