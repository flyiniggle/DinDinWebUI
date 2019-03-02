import * as Reducers from './dashboardReducer';


describe('dashboardReducer', function() {
    describe('startDashboardLoading', function() {
        it('should set the loading state to true.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.startDashboardLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.startDashboardLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', true);
            expect(result2).toHaveProperty('isLoading', true);
        });
    });

    describe('endDashboardLoading', function() {
        it('should set the loading state to false.', function() {
            const initialState1 = {
                isLoading: false,
                messages: []
            };
            const result1 = Reducers.endDashboardLoading(initialState1);
            const initalState2 = {
                isLoading: true,
                message: []
            };
            const result2 = Reducers.endDashboardLoading(initalState2);

            expect(result1).toHaveProperty('isLoading', false);
            expect(result2).toHaveProperty('isLoading', false);
        });
    });

    describe('setDashboardsMessages', function() {
        it('should set a message.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { messages: ['OH NO GOD HELP US ALL']};
            const result = Reducers.setDashboardMessages(initialState, action);

            expect(result).toHaveProperty('messages', action.messages);
        });

        it('should remove messages.', function() {
            const initialState = {
                someProp: 1,
                meals: [{id: 1}, {id: 2}]
            };
            const action = { };
            const result = Reducers.setDashboardMessages(initialState, action);

            expect(result).toHaveProperty('messages', undefined);
        });
    });
});