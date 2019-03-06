import ErrorMessage from 'Business/Validation/ErrorMessage';

import * as Reducers from './mealCreatorReducer';


describe('mealCreatorReducer', function() {
    describe('startMealCreatorLoading', function() {
        it('should set the loading state to true.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.startMealCreatorLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.startMealCreatorLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', true);
            expect(result2).toHaveProperty('isLoading', true);
        });
    });

    describe('endMealCreatorLoading', function() {
        it('should set the loading state to false.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.endMealCreatorLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.endMealCreatorLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', false);
            expect(result2).toHaveProperty('isLoading', false);
        });
    });

    describe('setMealCreatorsMessages', function() {
        it('should set a message.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { messages: ['OH NO GOD HELP US ALL']};
            const result = Reducers.setMealCreatorMessages(initialState, action);

            expect(result).toHaveProperty('messages', action.messages);
        });

        it('should remove messages.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { };
            const result = Reducers.setMealCreatorMessages(initialState, action);

            expect(result).toHaveProperty('messages', undefined);
        });
    });

    describe('acknowledgeMessage', function() {
        it('should remove the message with the matching Id from state.', function() {
            const initialState = {
                messages: [
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({})
                ]
            };
            const targetMessageId = initialState.messages[3].id;
            const action = { id: targetMessageId };
            const result = Reducers.acknowledgeMessage(initialState, action);

            expect(result.messages.find(m => m.id === targetMessageId)).toBeUndefined();
        });

        it('should do nothing if there is no matching message.', function() {
            const initialState = {
                messages: [
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({}),
                    new ErrorMessage({})
                ]
            };
            const action = { id: 'whooooeeeeeee!' };
            const result = Reducers.acknowledgeMessage(initialState, action);

            expect(result).toMatchObject(initialState);

        });
    });
});